export interface FilterState {
    instrument: string;
    instrumentSubCategory: string;

    distance: number;
    distanceUnlimited: boolean;

    brands: string[];

    minPrice: number;
    maxPrice: number;

    colors: string[];

    category: string;

}

export interface BrandOption {
    id: string;
    name: string;
    isSelected: boolean;
}

export interface ColorOption {
    id: string;
    name: string;
    hex: string;
    isSelected: boolean;
}

export type FilterChangeHandler = (filterState: FilterState) => void;

export type FilterResetHandeler = () => void;

export type FilterApplyHandler = (filterState: FilterState) => void;

