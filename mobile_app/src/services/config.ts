export const baseUrl = 'http://localhost:3000';
export const timeout = 30000


export const apiGetClasses = '/v1/class?page={page}'
export var apiGetClassMember = 'v1/class/{classId}/members?limit=20&page={page}&q={query}'
export var apiGetAllUser = 'v1/users?q={query}&limit=10000'
export var apiAddMember = 'v1/class/{classId}/members'
export var apiGetClassFeed = 'v1/media/mobile-list/{classId}?limit=20&page={page}&q={query}'
export var apiGetClassHomework = 'v1/media/mobile-list/{classId}?limit=20&page={page}&type=homework'
export var apiUploadFile = 'v1/media/upload-files'
export var apiPostFeed = 'v1/media'
export var apiPostComment = 'v1/media/{feedId}/comment'
export var apiFeedDetail = 'v1/media/{feedId}'
export var apiGetCurrentInfo = 'v1/auth/me'
export var apiUpdateUserInfo = 'v1/users/{userId}'
