/*
  # Initial schema for instrument marketplace

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `email` (text)
      - `is_seller` (boolean) - indicates if user can sell instruments
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text) - store name
      - `owner_id` (uuid) - references profiles.id
      - `address` (text)
      - `region` (text)
      - `phone` (text)
      - `lat` (float8) - latitude
      - `lng` (float8) - longitude
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `instruments`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `type` (text)
      - `subtype` (text)
      - `price` (integer)
      - `condition` (text)
      - `grade` (text)
      - `description` (text)
      - `features` (text[])
      - `specifications` (jsonb)
      - `images` (text[])
      - `store_id` (uuid) - references stores.id
      - `seller_id` (uuid) - references profiles.id
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for sellers to manage their own data
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  is_seller boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stores table
CREATE TABLE stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  address text NOT NULL,
  region text NOT NULL,
  phone text NOT NULL,
  lat float8 NOT NULL,
  lng float8 NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create instruments table
CREATE TABLE instruments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  type text NOT NULL,
  subtype text,
  price integer NOT NULL,
  condition text NOT NULL,
  grade text,
  description text NOT NULL,
  features text[],
  specifications jsonb,
  images text[] NOT NULL,
  store_id uuid REFERENCES stores(id),
  seller_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE instruments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Stores policies
CREATE POLICY "Stores are viewable by everyone"
  ON stores FOR SELECT
  USING (true);

CREATE POLICY "Sellers can insert stores"
  ON stores FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_seller = true
    )
  );

CREATE POLICY "Store owners can update their stores"
  ON stores FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Store owners can delete their stores"
  ON stores FOR DELETE
  USING (owner_id = auth.uid());

-- Instruments policies
CREATE POLICY "Instruments are viewable by everyone"
  ON instruments FOR SELECT
  USING (true);

CREATE POLICY "Sellers can insert instruments"
  ON instruments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_seller = true
    )
  );

CREATE POLICY "Sellers can update their instruments"
  ON instruments FOR UPDATE
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can delete their instruments"
  ON instruments FOR DELETE
  USING (seller_id = auth.uid());