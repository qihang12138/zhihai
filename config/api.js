let ApiUrl = 'https://xwz.dd371.com/api/';
const api = {
    ApiWechat: ApiUrl + 'login/login',
    ApiIndex: ApiUrl + 'index/index',
    ApiNewDetail: ApiUrl + 'user/news_detail',
    ApiTeacher: ApiUrl + 'index/teacher',
    ApiType: ApiUrl + 'index/type',
    ApiDetail: ApiUrl + 'user/detail',
    ApiDancerType: ApiUrl + 'user/dancer_type',
    ApiUserIndex: ApiUrl + 'user/index',
    ApiDancerSave: ApiUrl + 'user/dancer_save',
    ApiOrganIndex: ApiUrl + 'organ/index',
    ApiOrganDetail: ApiUrl + 'user/organ_detail',
    ApiDetailJob: ApiUrl + 'organ/detail_job',
    ApiCooper: ApiUrl + 'user/cooper',
    ApiDancer: ApiUrl + 'user/dancer',
    // 没写完
    ApiMyRelease: ApiUrl + 'user/my_release?status=1',
    ApiTypeLister: ApiUrl + 'index/type_lister',
    ApiSaveJob: ApiUrl + 'user/save_job',
    ApiIndexSearch: ApiUrl + 'index/search',
    ApiIndexSearchLister: ApiUrl + 'index/type_lister',
}
module.exports = api;