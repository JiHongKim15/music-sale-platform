import { InstrumentCategory } from '../types';

export const instrumentCategories: InstrumentCategory[] = [
  {
    name: '기타',
    subcategories: [
      {
        name: '일렉트릭 기타',
        items: [
          '스트라토캐스터',
          '레스폴',
          'PRS',
          'ESP',
          'Ibanez',
          'Jackson',
          'Gretsch'
        ]
      },
      {
        name: '어쿠스틱 기타',
        items: [
          'Martin',
          'Taylor',
          'Gibson',
          'Yamaha',
          'Guild',
          'Seagull'
        ]
      },
      {
        name: '베이스 기타',
        items: [
          'Fender',
          'Music Man',
          'Warwick',
          'Ibanez',
          'Yamaha',
          'Spector'
        ]
      },
      {
        name: '이펙터',
        items: [
          '디스토션',
          '오버드라이브',
          '딜레이',
          '리버브',
          '코러스',
          '플랜저'
        ]
      },
      {
        name: '앰프',
        items: [
          'Marshall',
          'Fender',
          'Vox',
          'Mesa Boogie',
          'Orange',
          'Blackstar'
        ]
      }
    ]
  },
  {
    name: '드럼',
    subcategories: [
      {
        name: '어쿠스틱 드럼',
        items: [
          'Pearl',
          'Tama',
          'DW',
          'Yamaha',
          'Gretsch',
          'Sonor'
        ]
      },
      {
        name: '전자 드럼',
        items: [
          'Roland',
          'Yamaha',
          'Alesis',
          'Millenium'
        ]
      },
      {
        name: '심벌',
        items: [
          'Zildjian',
          'Sabian',
          'Meinl',
          'Paiste'
        ]
      }
    ]
  },
  {
    name: '피아노',
    subcategories: [
      {
        name: '어쿠스틱 피아노',
        items: [
          'Steinway & Sons',
          'Yamaha',
          'Kawai',
          'Bosendorfer'
        ]
      },
      {
        name: '디지털 피아노',
        items: [
          'Roland',
          'Yamaha',
          'Casio',
          'Kawai'
        ]
      }
    ]
  },
  {
    name: '관악기',
    subcategories: [
      {
        name: '색소폰',
        items: [
          'Yamaha',
          'Selmer',
          'Yanagisawa',
          'Jupiter'
        ]
      },
      {
        name: '트럼펫',
        items: [
          'Bach',
          'Yamaha',
          'Conn',
          'King'
        ]
      },
      {
        name: '클라리넷',
        items: [
          'Buffet Crampon',
          'Yamaha',
          'Selmer',
          'Jupiter'
        ]
      }
    ]
  },
  {
    name: '현악기',
    subcategories: [
      {
        name: '바이올린',
        items: [
          'Stradivari',
          'Guarneri',
          'Yamaha',
          'Scott Cao'
        ]
      },
      {
        name: '첼로',
        items: [
          'Montagnana',
          'Stradivari',
          'Yamaha',
          'Scott Cao'
        ]
      }
    ]
  },
  {
    name: '신디사이저',
    subcategories: [
      {
        name: '스테이지 신디사이저',
        items: [
          'Nord',
          'Roland',
          'Yamaha',
          'Korg'
        ]
      },
      {
        name: '모듈러 신디사이저',
        items: [
          'Moog',
          'Behringer',
          'Make Noise',
          'Doepfer'
        ]
      }
    ]
  },
  {
    name: 'DJ 장비',
    subcategories: [
      {
        name: '턴테이블',
        items: [
          'Technics',
          'Pioneer DJ',
          'Reloop',
          'Numark'
        ]
      },
      {
        name: '컨트롤러',
        items: [
          'Pioneer DJ',
          'Native Instruments',
          'Denon DJ',
          'Roland'
        ]
      }
    ]
  },
  {
    name: '음향장비',
    subcategories: [
      {
        name: '스피커',
        items: [
          'JBL',
          'QSC',
          'Yamaha',
          'Mackie'
        ]
      },
      {
        name: '믹서',
        items: [
          'Allen & Heath',
          'Yamaha',
          'Behringer',
          'Mackie'
        ]
      }
    ]
  },
  {
    name: '마이크',
    subcategories: [
      {
        name: '보컬 마이크',
        items: [
          'Shure',
          'Sennheiser',
          'AKG',
          'Neumann'
        ]
      },
      {
        name: '악기용 마이크',
        items: [
          'Shure',
          'AKG',
          'Audix',
          'DPA'
        ]
      }
    ]
  }
];