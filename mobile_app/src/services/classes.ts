import Keychain from 'react-native-keychain'
import {
  apiAddMember,
  apiFeedDetail,
  apiGetAllUser,
    apiGetClasses, apiGetClassFeed, apiGetClassHomework, apiGetClassMember, apiPostComment, apiPostFeed, apiUploadFile
} from './config'
import request from './request'

export const getClasses = async (page = 1): Promise<any> => {
    try {
      const token = await Keychain.getGenericPassword({
        service: 'accessToken',
      }).then(res => {
        if (res) return res.password
        return ''
      })
      var getClassesAPIStr = apiGetClasses.replace("{page}", page)
      const result = await request(token).get(getClassesAPIStr) 
      return result.data;
    } catch (error) {
      
    }
  }
  export interface ApiResponse<T> {
    cancel?: boolean
    code: number
  }

  export const getClassMembers = async (classId: string, page: number, searchQuery: string = ""): Promise<any> => {
    try {
      const token = await Keychain.getGenericPassword({
        service: 'accessToken',
      }).then(res => {
        if (res) return res.password
        return ''
      })
      var apiGetMembers = apiGetClassMember
        .replace("{classId}", classId)
        .replace("{page}", page.toString())
        .replace("{query}", searchQuery)
      const result = await request(token).get(apiGetMembers) 
      return { 
        status: 1, 
        data: result.data.results
      };
    } catch (error) {
      return { 
        status: 0,
        cancel: false,
        message: 'đã có lỗi xảy ra',
        code: 101,
        data: null
      }
    }
  }

  export const getUsers = async (searchQuery: string = ""): Promise<any> => {
    try {
      const token = await Keychain.getGenericPassword({
        service: 'accessToken',
      }).then(res => {
        if (res) return res.password
        return ''
      })
      var apiGetAllUsers = apiGetAllUser
        .replace("{query}", searchQuery)
      const result = await request(token).get(apiGetAllUsers)
      return { 
        status: 1, 
        data: result.data 
      };
    } catch (error) {
      return { 
        status: 0,
        cancel: false,
        message: 'đã có lỗi xảy ra',
        code: 101,
        data: null
      }
    } 
  }

  
// Passing configuration object to axios
export const addMember = async (addMemberData: { userId: string, classId: string }) => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    var apiAddMemberURI = apiAddMember
      .replace("{classId}", addMemberData.classId)
    const result = await request(token).post(apiAddMemberURI, { userId: addMemberData.userId })
    return {  
      success: true,
      message: "Thêm thành viên thành công",
      code: 100,
      data: null
    };
  } catch (error) { 
    return { 
      status: error.response.data.code,
      success: false,
      message: error.response.data.message,
      code: 101,
      data: null
    }
  } 
};

 
// Xoá thành viên lớp học
export const removeMemberFromClass = async (addMemberData: { userId: string, classId: string }) => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    var apiAddMemberURI = apiAddMember
      .replace("{classId}", addMemberData.classId)
    const result = await request(token).delete(apiAddMemberURI, { userId: addMemberData.userId })
    return {  
      success: true,
      message: "Xoá thành viên thành công",
      code: 100,
      data: null
    };
  } catch (error) { 
    return { 
      status: error.response.data.code,
      success: false,
      message: error.response.data.message,
      code: 101,
      data: null
    }
  }

  
};

export const getClassFeedApi = async (classId: string, page: number, searchQuery: string = ""): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    var apiGetFeeds = apiGetClassFeed
      .replace("{classId}", classId)
      .replace("{page}", page.toString())
      .replace("{query}", searchQuery)
    const result = await request(token).get(apiGetFeeds) 
    return { 
      status: 1, 
      data: result.data.data.results
    };
  } catch (error) {
    return { 
      status: 0,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
}

export const getClassHomework = async (classId: string, page: number): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    var apiGetHomeworks = apiGetClassHomework
      .replace("{classId}", classId)
      .replace("{page}", page.toString()) 
    const result = await request(token).get(apiGetHomeworks) 
    return { 
      status: 1, 
      data: result.data.data.results
    };
  } catch (error) {
    return { 
      status: 0,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
}

export const getFeedDetailApi = async (feedId: string): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })
    var apiGetFeed = apiFeedDetail
      .replace("{feedId}", feedId) 
      
    const result = await request(token).get(apiGetFeed)  
    return { 
      status: 1, 
      data: result.data
    };
  } catch (error) {
    return { 
      status: 0,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
}


// Passing configuration object to axios
export const uploadFile = async (fileFormData: FormData) => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    }) 
    const result = await request(token).post(apiUploadFile, fileFormData, { headers: {"Content-Type": "multipart/form-data"} })
    return {  
      success: true,
      message: "Tải File lên thành công",
      code: 100,
      data: result.data
    };
  } catch (error) { 
    return {  
      success: false,
      message: "Lỗi khi tải file",
      code: 101,
      data: null
    }
  } 
};


export const postClassFeed = async (data: any): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    }) 
    const result = await request(token).post(apiPostFeed, data) 
    return { 
      status: 1, 
      data: result.data
    };
  } catch (error) {
    return { 
      status: 0,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
}


export const submitComment = async (feedId: string, commentContent: string): Promise<any> => {
  try {
    const token = await Keychain.getGenericPassword({
      service: 'accessToken',
    }).then(res => {
      if (res) return res.password
      return ''
    })

    const result = await request(token).post(apiPostComment.replace("{feedId}", feedId), { commentContent }) 
    return { 
      status: true, 
      data: result.data
    };
  } catch (error) {
    return { 
      status: false,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
}