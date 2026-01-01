// DramaBox API Types

export interface TagV3 {
  tagId: number
  tagName: string
  tagEnName: string
}

export interface RankVo {
  rankType: number
  hotCode: string
  sort: number
}

export interface Drama {
  bookId: string
  bookName: string
  coverWap: string
  chapterCount: number
  introduction: string
  tags: string[]
  tagV3s: TagV3[]
  protagonist: string
  rankVo: RankVo
  shelfTime: string
  inLibrary: boolean
  isEntry?: number
  index?: number
  dataFrom?: string
  cardType?: number
  markNamesConnectKey?: string
  bookShelfTime?: number
}

export interface SearchDrama {
  bookId: string
  bookName: string
  introduction: string
  cover: string
  protagonist: string
  tagNames: string[]
  inLibrary: boolean
  sort?: number
}

export interface Performer {
  performerId: string
  performerName: string
  performerFormatName: string
  performerAvatar: string
  videoCount: number
}

export interface Chapter {
  id: string
  name: string
  index: number
  indexStr: string
  unlock: boolean
  mp4?: string
  m3u8Url?: string
  m3u8Flag?: boolean
  cover: string
  utime: string
  chapterPrice: number
  duration: number
  new: boolean
}

export interface TypeTwo {
  id: number
  name: string
  replaceName: string
}

export interface BookDetail {
  bookId: string
  bookName: string
  cover: string
  viewCount: number
  followCount: number
  introduction: string
  chapterCount: number
  labels: string[]
  tags: string[]
  typeTwoList: TypeTwo[]
  language: string
  simpleLanguage: string
  bookNameEn: string
  shelfTime: string
  performerList: Performer[]
}

export interface RecommendDrama {
  bookId: string
  bookName: string
  cover: string
  followCount: number
  introduction: string
  chapterCount: number
  labels: string[]
  tags: string[]
  typeTwoList: TypeTwo[]
  language: string
  simpleLanguage: string
}

export interface DramaDetailResponse {
  data: {
    book: BookDetail
    recommends: RecommendDrama[]
    chapterList: Chapter[]
  }
  status: number
  message: string
  timestamp: number
  success: boolean
}

// Types for allepisode API response
export interface VideoPath {
  quality: number
  videoPath: string
  isDefault: number
  isEntry: number
  isVipEquity: number
}

export interface CdnInfo {
  cdnDomain: string
  isDefault: number
  videoPathList: VideoPath[]
}

export interface AllEpisode {
  chapterId: string
  chapterIndex: number
  chapterName: string
  chapterImg: string
  chapterType: number
  isCharge: number
  cdnList: CdnInfo[]
  viewingDuration: number
  chargeChapter: boolean
}

