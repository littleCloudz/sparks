/**
 * ymock配置模块。
 *
 * 功能：用于配置匹配mock请求的规则。
 *
 * 该模块就是一个普通的nodejs模块。
 * 但对该模块增加了热更新功能，编辑该文件后不必重新启动服务。
 *
 * url匹配规则举例：
 * module.exports = [
 *  {
 *      pattern: /test\.json/, // 正则表达式形式，
 *      respondWith: "test.json" // json文件，相对于当前目录
 *  },
 *  {
 *      pattern: /detail\.json/,
 *      respondWith: test.mockjson" // mockjson 文件，相对于当前目录
 *  },
 *  {
 *      pattern: /list\.json/,
 *      respondWith: function(postData, qs){ // Function，根据请求参数，返回mock数据文件，相对于当前目录
 *          return "list" + postData.pageIndex  + ".json";
 *      }
 *  },
 *  {
 *      pattern: /list\.json/,
 *      respondWith: function(postData, qs, req, res){ // 自定义返回mock数据
 *          res.end("hello");
 *      }
 *  },
 *  {
 *      pattern: "https://github.com/yaofly2012/ymock", // 字符串形式，精确匹配
 *      respondWith: "test.json"
 *  },
 *  {
 *      pattern: function(req) {, // 诊断函数形式，根据函数值判断是否匹配
 *          // 判断逻辑
 *          return boolean;
 *      }
 *      respondWith: "test.json" 
 *  },
 * ];
 */

// var rights = require('./ymock/creditcard-rights')
// var cc = require('./ymock/cc')
// var offline = require('./ymock/offline')
// var qbcc = require('./ymock/qbcc')
// var event = require('./ymock/event')

var offlineApis = {
    // 获取主题活动列表
    "CCGVTL0001": function (data) {
        var userList = [];
        // for (var i = 0; i < pageSize; ++i) {
        userList.push({
            id: "test",
            themeName: "测试-themeName",
            subThemeName: "测试-subThemeName",
            themePicUrl: "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0k0j00000004fa8F1ED.jpg",
            jumpUrl: "https://m.ctrip.com/webapp/myrights/creditcard",
            weight: "测试-weight",
            status: "1",
            themePrice: "测试-themePrice"
        });
        // }
        return {
            vacationThemes: userList,
            resultCode: "CMN000000",
            message: "请求结果消息,必填"

        }
    },
    // offline查询东趣卡权益
    "QRQ001": function (data) {
        var rightsList = [];
        for (var i = 0; i < 2; ++i) {
            rightsList.push({
                uid: 'wwwwww',
                mobile: "13621715759", //用户手机号(加掩)
                name: "01", //权益名称
                url: "310*************1X", //权益详情页url
                isStandarded: "123", //是否已达标
                couponList: [{
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '1',
                    couponNo: 'C0001',
                    receiveStatus: 0
                }, {
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '0',
                    couponNo: 'C0002',
                    receiveStatus: 1
                }, {
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '1',
                    couponNo: 'C0002',
                    receiveStatus: 1
                }, {
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '1',
                    couponNo: 'C0002',
                    receiveStatus: 2
                }, {
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '1',
                    couponNo: 'C0002',
                    receiveStatus: 3
                }, {
                    uid: '123',
                    rightsName: 'rightsName',
                    couponName: 'couponName',
                    standardStatus: '1',
                    couponNo: 'C0002',
                    receiveStatus: 5
                }]
            });
        }
        return {
            queryRightsResult: rightsList,
            resultCode: "CMN000000"
        }
    },
    // aid sid
    "CCSBI002": function (data) {
        var pageIndex = 1,
            pageSize = 10;
        var externalBCPInfoList = [];
        for (var i = 0; i < pageSize; ++i) {
            externalBCPInfoList.push({
                ouid: "ouid_" + pageIndex + i,
                aid: "aid_" + pageIndex + i,
                sid: "sid_" + pageIndex + i,
                sourceId: "sourceId_" + pageIndex + i,
                entryApplyAmount: 10 * i,
                applyOrderAmount: 11 * i
            })
        }
        return {
            resultCode: "CMN000000",
            entryApplyTotal: 1234567890,
            applyOrderTotal: 123456,
            statisticTimeBegin: "2017年01月04日",
            statisticTimeEnd: "2017年05月04日",
            externalBCPInfoList: externalBCPInfoList
        }
    },
    // bcp
    "CCSBI001": function (data) {
        var pageIndex = 1,
            pageSize = 10;
        var internalBCPInfoList = [];
        for (var i = 0; i < pageSize; ++i) {
            internalBCPInfoList.push({
                bid: "bid" + pageIndex + i,
                bidName: "bidName" + pageIndex + i,
                cid: "cid" + pageIndex + i,
                cidName: "cidName" + pageIndex + i,
                pid: "pid" + pageIndex + i,
                pidName: "pidName" + pageIndex + i,
                entryApplyAmount: 10 * i,
                applyOrderAmount: 11 * i
            })
        }
        return {
            resultCode: "CMN000000",
            entryApplyTotal: 1234567890,
            applyOrderTotal: 12345678,
            statisticTimeBegin: "2017年01月04日",
            statisticTimeEnd: "2017年05月04日",
            internalBCPInfoList: internalBCPInfoList
        }
    },
    // 用户查询
    "CCQCI001": function (data) {
        var pageIndex = data.pageInfo.pageIndex;
        var pageSize = data.pageInfo.pageSize;
        var userList = [];
        for (var i = 0; i < pageSize; ++i) {
            userList.push({
                vip: "vip_" + pageIndex,
                uid: "uid_i",
                cname: "姓名",
                mobile: "13621715759",
                idType: "01",
                idNo: "310*************1X",
                email: "test@ctrip.com",
                coName: "携程旅行网",
                hmAddr: "安徽省/亳州/涡阳 宁虹路666",
                coAddr: "上海/上海/长宁区 金钟路968",
                coTel: "021-99999999",
                xname: "联系人",
                xtel: "13621547878",
                createTime: "20170306 12:00:00",
                custStatus: "0001"
            });
        }
        return {
            pageInfo: {
                pageCount: 100
            },
            custInfoList: userList,
            resultCode: "CMN000000"
        }
    },
    // 获取秒杀活动列表
    "CCQAA001": function (data) {
        var pageIndex = data.pageInfo.pageIndex;
        var pageSize = data.pageInfo.pageSize;
        var userList = [];
        for (var i = 0; i < pageSize; ++i) {
            userList.push({
                activityId: "1235343",
                activityType: "",
                activityTitle: "我是测试活动标题",
                activitySubTitle: "副标题",
                activityPreferentialMoney: "",
                activityImgUrl: "",
                activityStartDate: "2017-08-01",
                activityEndDate: "2017-10-01",
                seckillStartTime: "14:00:00",
                seckillEndTime: "20:00:00",
                countdown: "15:00:00",
                couponId: "12795",
                productionLineId: 14,
                couponType: 22,
                activityStatus: 5,
                stock: 44,
                couponReceiveCount: 33
            });
        }

        return {
            pageInfo: {
                pageCount: 11
            },
            queryAllActivities: userList,
            resultCode: "CMN000000"
        }
    },

    // 保存主题活动
    "CCSVT0001": function () {
        return {
            resultCode: "CMN000000", //CMN000000表示全部成功,CMN999999 系统内部错误
            message: "请求结果消息,必填"
        }
    },
    // offlineActivity
    "CCOFA001": function () {
        return {
            resultCode: "CMN000000", //CMN000000表示全部成功,CMN999999 系统内部错误
            message: "请求结果消息,必填"
        }
    },
    // onlineActivity
    "CCONA001": function () {
        return {
            resultCode: "CMN000000", //CMN000000表示全部成功,CMN999999 系统内部错误
            message: "请求结果消息,必填"
        }
    },
    // deleteActivity
    "CCDA001": function () {
        return {
            resultCode: "CMN000000", //CMN000000表示全部成功,CMN999999 系统内部错误
            message: "请求结果消息,必填"
        }
    },
    // endEarlyActivity
    "CCEESA001": function () {
        return {
            resultCode: "CMN000000", //CMN000000表示全部成功,CMN999999 系统内部错误
            message: "请求结果消息,必填"
        }
    },
    // 订单状态列表
    "CCGASL001": function () {
        return {
            resultCode: "CMN000000",
            applyStatusList: [{
                code: "0000",
                desc: "获取订单号"
            }, {
                code: "0010",
                desc: "基础风控"
            }, {
                code: "0020",
                desc: "办卡浮层"
            }, {
                code: "0030",
                desc: "开始申卡"
            }, {
                code: "0040",
                desc: "基本信息提交"
            }, {
                code: "0050",
                desc: "详细风控"
            }, {
                code: "0060",
                desc: "地址信息提交"
            }]
        }
    },
    //查询产线id 
    "CCQPL001": function () {
        return {
            "message": "成功2",
            "productionLineList": [{
                "productionLineId": 1,
                "productionLineName": "机票"
            },
                {
                    "productionLineId": 2,
                    "productionLineName": "酒店"
                },
                {
                    "productionLineId": 3,
                    "productionLineName": "旅游"
                },
                {
                    "productionLineId": 4,
                    "productionLineName": "团购"
                },
                {
                    "productionLineId": 5,
                    "productionLineName": "国际网站"
                },
                {
                    "productionLineId": 6,
                    "productionLineName": "市场"
                },
                {
                    "productionLineId": 8,
                    "productionLineName": "服务营销"
                },
                {
                    "productionLineId": 10,
                    "productionLineName": "商旅"
                },
                {
                    "productionLineId": 11,
                    "productionLineName": "电话营销"
                },
                {
                    "productionLineId": 12,
                    "productionLineName": "无线事业部"
                },
                {
                    "productionLineId": 13,
                    "productionLineName": "火车票"
                },
                {
                    "productionLineId": 14,
                    "productionLineName": "金融"
                },
                {
                    "productionLineId": 16,
                    "productionLineName": "网络市场部"
                },
                {
                    "productionLineId": 17,
                    "productionLineName": "酒店+景点"
                },
                {
                    "productionLineId": 18,
                    "productionLineName": "用车"
                },
                {
                    "productionLineId": 20,
                    "productionLineName": "门票玩乐"
                },
                {
                    "productionLineId": 21,
                    "productionLineName": "邮轮"
                },
                {
                    "productionLineId": 22,
                    "productionLineName": "当地玩乐"
                },
                {
                    "productionLineId": 24,
                    "productionLineName": "汽车票"
                },
                {
                    "productionLineId": 25,
                    "productionLineName": "在线购"
                },
                {
                    "productionLineId": 26,
                    "productionLineName": "国际火车票"
                },
                {
                    "productionLineId": 27,
                    "productionLineName": "景酒"
                },
                {
                    "productionLineId": 28,
                    "productionLineName": "团队游"
                },
                {
                    "productionLineId": 29,
                    "productionLineName": "礼品卡"
                },
                {
                    "productionLineId": 30,
                    "productionLineName": "周末游"
                },
                {
                    "productionLineId": 31,
                    "productionLineName": "外币兑换"
                },
                {
                    "productionLineId": 32,
                    "productionLineName": "退税"
                },
                {
                    "productionLineId": 33,
                    "productionLineName": "刷卡奖励"
                },
                {
                    "productionLineId": 34,
                    "productionLineName": "攻略社区"
                },
                {
                    "productionLineId": 35,
                    "productionLineName": "民宿"
                },
                {
                    "productionLineId": 36,
                    "productionLineName": "行李寄送"
                },
                {
                    "productionLineId": 37,
                    "productionLineName": "优品商城"
                },
                {
                    "productionLineId": 38,
                    "productionLineName": "存款证明"
                },
                {
                    "productionLineId": 39,
                    "productionLineName": "船票"
                },
                {
                    "productionLineId": 40,
                    "productionLineName": "到店购"
                },
                {
                    "productionLineId": 41,
                    "productionLineName": "兑换券"
                },
                {
                    "productionLineId": 42,
                    "productionLineName": "运动场馆"
                },
                {
                    "productionLineId": 43,
                    "productionLineName": "定制旅行"
                },
                {
                    "productionLineId": 44,
                    "productionLineName": "会议·团队房"
                },
                {
                    "productionLineId": 45,
                    "productionLineName": "智行机票"
                },
                {
                    "productionLineId": 46,
                    "productionLineName": "铁友机票"
                },
                {
                    "productionLineId": 47,
                    "productionLineName": "智行酒店"
                },
                {
                    "productionLineId": 48,
                    "productionLineName": "铁友酒店"
                },
                {
                    "productionLineId": 50,
                    "productionLineName": "线下店"
                },
                {
                    "productionLineId": 51,
                    "productionLineName": "智行国际机票"
                },
                {
                    "productionLineId": 52,
                    "productionLineName": "铁友国际机票"
                },
                {
                    "productionLineId": 53,
                    "productionLineName": "出行管家"
                },
                {
                    "productionLineId": 54,
                    "productionLineName": "信用卡"
                }
            ],
            "resultCode": "CMN000000"
        }
    },


    //游金币列表查询
    "CCQAPL001": function () {
        return {
            "message": "成功",
            "pageInfo": {"pageIndex": 1, "pageSize": 10, "pageCount": 7},
            "queryProductList": [{
                "productId": "P20180130110224",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0u0o0000000612tF71A.png",
                "productLineId": "1",
                "productPrice": "100",
                "productTitle": "[东亚携程白金卡]机票立减50元2222",
                "promotionId": "13944",
                "weight": "99",
                "state": '1',
                "stock": 333,
                "isRecommend": '1' // 0不推荐，1推荐


            }, {
                "productId": "P20180126170234",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0v0o000000061456D2D.png",
                "productLineId": "1",
                "productPrice": "2000",
                "productTitle": "[东亚携程白金卡]机票立减100元",
                "promotionId": "14014",
                "weight": "98",
                "state": '1',
                "stock": 333,
                "isRecommend": '0' // 0不推荐，1推荐

            }, {
                "productId": "P20180130110338",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0w0o000000061py9C86.png",
                "productLineId": "1",
                "productPrice": "5000",
                "productTitle": "[东亚携程白金卡]机票立减200元",
                "promotionId": "13965",
                "weight": "97",
                "state": '1',
                "stock": 333,
                "isRecommend": '0' // 0不推荐，1推荐

            }, {
                "productId": "P20180130110412",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt010o000000063yw8658.png",
                "productLineId": "2",
                "productPrice": "1000",
                "productTitle": "[东亚携程白金卡]酒店立减50元",
                "promotionId": "4",
                "weight": "96",
                "state": '1',
                "stock": 333,
                "isRecommend": '0' // 0不推荐，1推荐

            }, {
                "productId": "P20180126165852",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt020o000000062fkFE72.png",
                "productLineId": "1",
                "productPrice": "2000",
                "productTitle": "[东亚携程白金卡]酒店立减100元",
                "promotionId": "5",
                "weight": "95",
                "state": '1',
                "stock": 333,
                "isRecommend": '0' // 0不推荐，1推荐

            }, {
                "productId": "P20180130110525",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt030o0000000612hB53A.png",
                "productLineId": "2",
                "productPrice": "5000",
                "productTitle": "[东亚携程白金卡]酒店立减200元",
                "promotionId": "6",
                "weight": "94",
                "state": '1',
                "stock": 333,
                "isRecommend": '1' // 0不推荐，1推荐

            }, {
                "productId": "P20180126170438",
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0g0o000000061da9504.png",
                "productLineId": "18",
                "productPrice": "1688",
                "productTitle": "【东携卡用户专享】100元国内租车券",
                "promotionId": "14019",
                "weight": "93",
                "state": '1',
                "stock": 333,
                "isRecommend": '0' // 0不推荐，1推荐

            }],
            "resultCode": "CMN000000"
        }
    },
    //查询秒杀活动详情
    "CCQA0001": function () {
        return {
            "message": "成功333",
            "queryActivityResult": {
                "activityEndDate": "2017-12-31",
                "activityId": "C20170918214849875514",
                "activityImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt010o000000063ugA652.png",
                "activityPreferentialMoney": "",
                "activityStartDate": "2017-09-19",
                "activityStatus": 5,
                "activitySubTitles": [{
                    "productId": 1005633572,
                    "subTitle": "告警"
                },
                    {
                        "productId": 1005637121,
                        "subTitle": "不告警"
                    }
                ],
                "activityTitle": "100的券",
                "countdown": "15:00:00",
                "couponId": "13676",
                "couponReceiveCount": 0,
                "couponType": 0,
                "jumpUrl": "https://pages.c-ctrip.com/creditcard/h5/dailypromosion/discount100.html",
                "productionLineId": 3,
                "seckillEndTime": "14:00:00",
                "seckillStartTime": "13:00:00",
                "stock": 22
            },
            "resultCode": "CMN000000"

        }
    },
    "QNYIL0001": function () {
        return {
            "pageInfo": {
                "pageCount": 11,
                "pageIndex": 1,
                "pageSize": 10

            },
            "nineYuanInfo": [{
                "id": "1",
                "activityId": "1235343",
                "title": "我是测试活动标题",
                "validDate": "2017-08-01至2017-10-01",
                "countDown": '33',
                "inventory": "44",
                "num": "22",
                "status": "5",
                "activityTime": "14:00:00至20:00:00",
            },
                {
                    "id": "2",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "3",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "4",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "5",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "6",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "7",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "8",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "9",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "10",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                }, {
                    "id": "11",
                    "activityId": "1235343",
                    "title": "我是测试活动标题",
                    "validDate": "2017-08-01至2017-10-01",
                    "countDown": '33',
                    "inventory": "44",
                    "num": "22",
                    "status": "5",
                    "activityTime": "14:00:00至20:00:00",
                },
            ],
            "resultCode": "CMN000000"
        }
    },

    "CCQTTUSI002": function () {
        return {
            "pageInfo": {
                "pageCount": 2,
                "pageIndex": 1,
                "pageSize": 10
            },
            "userStandardInfoList": [{
                "uid": "123",
                "name": "zxy",
                "trainOrderId": "abc",
                "activityMonth": "2018-03",
                "standardStatus": false,
                "noStandardStatusReason": "未达标原因",
                "consumePoints": "3,000/2,666",
                "cardType": "0068"
            },
                {
                    "uid": "24",
                    "name": "zxy22",
                    "trainOrderId": "abc22",
                    "activityMonth": "2018-04",
                    "standardStatus": true,
                    "noStandardStatusReason": "未达标原因",
                    "consumePoints": "3,000/0",
                    "cardType": "0067"

                }
            ],
            "resultCode": "CMN000000"
        }
    },
    "CCQTTUSI001": function () {
        return {
            "userStandardInfoDetail": {
                "uid": "123",
                "name": "用户name",
                "idNumber": "31022619885311464",
                "mobile": "186561264356",
                "verifiedDate": "2018-03-04",
                "wechatBindStatus": true,
                "activeStatus": true,
                "activeDate": "2018-05-06",
                "trainOrderId": "x12356",
                // "trainOrderId": "",
                "activityMonth": "2018-05",
                "standardStatus": false,
                "noStandardStatusReason": "未达标原因",
                "receiveStatus": false,
                "consumePoints": "30/2,666",
                "orderAmount": "32.5",
                "passengerInfoList": [{
                    "passengerName": "乘车A",
                    "passengerIdNumber": "31023645659556"
                }, {
                    "passengerName": "我是乘客B",
                    "passengerIdNumber": "31023645659556"
                }],
                "sourceFromCode": "",
                "bookingDate": "2018-03-08",
                "trainTicketAmount": "32.5",
                "cashBackAmount": "15",
                "paymentChannel": "02",
                "quickPaymentTrade": true,
                "orderStatus": "退改签状态"
            },
            "resultCode": "CMN000000"
        }
    },
    "abc": function () {
        return {
            "accountList": [{
                "userName": "李白", //用户姓名
                "userPhone": "187****4567", //手机号码
                "idNo": "31063******12", //证件号
                "cid": "1234567",
                "accountRestAmt": "10,000", //账户余额
                "createTime": "2018-09-13 21:04:22" //账户创建时间
            }],
            "pageInfo": {
                "pageCount": 22,
                "pageIndex": 1,
                "pageSize": 10
            },
            "resultCode": "CMN000000"
        }
    },
    "addMerchandise": function () {
        return {
            "resultCode": "CMN000000"
        }
    },
    "getAccountCheckInfo": function () {
        return {
            "message": "成功",

            "resultCode": "CMN000000",

            "pageInfo": {

                "pageIndex": 1,
                "pageSize": 10,
                "pageCount": 47

            },
            "listType": 1, // 1：支付端账目 2:信用卡后台账目  列表类型
            "list": [{
                "orderNo": "123453", //业务订单号
                "requetsNo": "1234", //请求号
                "paymentNo": "123434343", //支付流水号
                "cid": "xxxx",
                "userName": "陈白", //姓名
                "idNo": "15618*****739203", //身份证
                "xcodeNum": "3000", //程金币总数量
                "tradeStatus": "成功", //交易状态
                "tradeType": "兑换", //交易类型
                "goodsNum": "3", //商品数量
                "source": "礼品卡10元", //渠道来源
                "tradeTime": "2018-09-13 21:04:22" //交易时间
            }

            ]
        }
    },


    "GPL001": function () {
        return {
            "pageInfo": {
                "pageCount": 3,
                "pageIndex": 1,
                "pageSize": 10

            },


            "products": [{
                "productId": '1235343',
                "productTitle": "我是测试活动标题5",
                "productPrice": '33',
                "promotionId": '44',
                "productLineId": '22',
                "weight": '10',
            }, {
                "productId": '1235343',
                "productTitle": "我是测试活动标题2",
                "productPrice": '33',
                "promotionId": '44',
                "productLineId": '22',
                "weight": '2',
            }, {
                "productId": '1235343',
                "productTitle": "我是测试活动标题6",
                "productPrice": '33',
                "promotionId": '44',
                "productLineId": '22',
                "weight": '6',
            }],
            "resultCode": "CMN000000"
        }
    }

    ,
    //queryNineActivityDetail
    "QNAD001": function () {
        return {
            "message": "成功333",
            "resultCode": "CMN000000",
            "queryNineYuanActivityDetail": {
                "activityStartDate": "2018-01-19",
                "activityEndDate": "2018-01-30",
                "activityTitle": "d",
                "activityCycle": 3,
                "seckillStartTime": "06:02:04",
                "seckillEndTime": "07:05:03",
                "countdown": 12,
                "activityCondition": [{
                    "id": 1334,
                    "conditionType": 1, //1:消费，2：分期
                    "conditionUnit": "元", //元，笔，次
                    "conditionLevel": [1000, 5000, 10000]
                }, {
                    "id": 1334,
                    "conditionType": 2, //1:消费，2：分期
                    "conditionUnit": "元", //元，笔，次
                    "conditionLevel": [1, 2, 3]
                }, {
                    "id": 1334,
                    "conditionType": 2, //1:消费，2：分期
                    "conditionUnit": "笔", //元，笔，次
                    "conditionLevel": [1000, 5000, 10000]
                }],
                "activityProduct": [{
                    "id": 12,
                    "couponImgUrl": '',
                    "productLevel": 2,
                    "couponId": 133,
                    "stock": 33,
                    "productionLineId": 44,
                    "couponImgType": "png",
                    // "couponImg": "", //base64
                    "couponName": "优惠券名称",
                    "preferentialMoney": "3333",

                }, {
                    "id": 34,
                    "couponImgUrl": '',
                    "productLevel": 2,
                    "couponId": 1322234,
                    "stock": 33,
                    "productionLineId": 44,
                    "couponImgType": "png",
                    // "couponImg": "", //base64
                    "couponName": "优惠券名称33",
                    "preferentialMoney": "3333",

                }, {
                    "id": 44,
                    "couponImgUrl": 'https://pages.c-ctrip.com/creditcard/h5/20171208/images/original_ticket20171214.png',
                    "productLevel": 3,
                    "couponId": 1222322234,
                    "stock": 33,
                    "productionLineId": 44,
                    "couponImgType": "png",
                    // "couponImg": "", //base64
                    "couponName": "优惠券名称44",
                    "preferentialMoney": "3333",

                }, {
                    "id": 23,
                    "couponImgUrl": '',
                    "productLevel": 1,
                    "couponId": 1334,
                    "stock": 33,
                    "productionLineId": 44,
                    "couponImgType": "png",
                    // "couponImg": "", //base64
                    "couponName": "优惠券名称22",
                    "preferentialMoney": "3333",

                }, {
                    "id": 133,
                    "couponImgUrl": '',
                    "productLevel": 3,
                    "couponId": 1334,
                    "stock": 33,
                    "productionLineId": 44,
                    "couponImgType": "png",
                    // "couponImg": "", //base64
                    "couponName": "优惠券名称22",
                    "preferentialMoney": "3333",

                }]
            },

        }
    }

    ,
    //queryProductDetail
    "CCQPD001": function () {
        return {
            "message": "成功111",
            "resultCode": "CMN000000",
            "queryProductDetailResult": {
                "productId": "P20180130110224",
                "productTitle": "[东亚携程白金卡]机票立减50元2222",
                "productPrice": "100",
                "weight": "99",
                "promotionId": "13944",
                "productLineId": "1",
                "productUsageRule": '规则xxxx',
                "productImgUrl": "https://dimg.fws.qa.nt.ctripcorp.com/images/zt0u0o0000000612tF71A.png",
                "state": '1',
                "stock": 333,
                "isRecommend": '1' // 0不推荐，1推荐
            },

        }
    }

    ,

    //addActivityForNineYuan
    // "addNineYuanActivity":{
    //     "activityStartDate":"2018-01-19",
    //     "activityEndDate":"2018-01-30",
    //     "activityTitle":"d",
    //     "activityCycle": 3,
    //     "seckillStartTime":"06:02:04",
    //     "seckillEndTime":"07:05:03",
    //     "countdown": 12,
    //     "activityCondition":[{
    //         "id": 1334,
    //         "conditionType": 1, //1:消费，2：分期
    //         "conditionUnit": "元", //元，笔，次
    //         "conditionLevel": [1000,5000,10000]
    //     },{
    //         "id": 1334,
    //         "conditionType": 2, //1:消费，2：分期
    //         "conditionUnit": "元", //元，笔，次
    //         "conditionLevel": [1000,5000,10000]
    //     },{
    //         "id": 1334,
    //         "conditionType": 2, //1:消费，2：分期
    //         "conditionUnit": "笔", //元，笔，次
    //         "conditionLevel": [1000,5000,10000]
    //     }],
    //     "activityProduct": [{
    //         "productLevel": 2,
    //         "couponId": 133,
    //         "stock": 33,
    //         "productionLineId": 44,
    //         "couponImgType": "png",
    "couponImg": "", //base64
    //         "couponName": "优惠券名称",
    //         "preferentialMoney": "3333",

    //     },{
    //         "productLevel": 2,
    //         "couponId": 1322234,
    //         "stock": 33,
    //         "productionLineId": 44,
    //         "couponImgType": "png",
    "couponImg": "", //base64
    //         "couponName": "优惠券名称33",
    //         "preferentialMoney": "3333",

    //     },{
    //         "productLevel": 3,
    //         "couponId": 1222322234,
    //         "stock": 33,
    //         "productionLineId": 44,
    //         "couponImgType": "png",
    "couponImg": "", //base64
    //         "couponName": "优惠券名称44",
    //         "preferentialMoney": "3333",

    //     },{
    //         "productLevel": 1,
    //         "couponId": 1334,
    //         "stock": 33,
    //         "productionLineId": 44,
    //         "couponImgType": "png",
    "couponImg": "", //base64
    //         "couponName": "优惠券名称22",
    //         "preferentialMoney": "3333",

    //     },{
    //         "productLevel": 3,
    //         "couponId": 1334,
    //         "stock": 33,
    //         "productionLineId": 44,
    //         "couponImgType": "png",
    "couponImg": "", //base64
    //         "couponName": "优惠券名称22",
    //         "preferentialMoney": "3333",

    //     }]
    // }
    //addNineYuanActivity
    "CCANYA001": function () {
        return {
            resultCode: "CMN000000",
            message: "addNineYuanActivity"
        }
    }

    ,
    //updateNineYuanActivity
    "CCUNYA001": function () {
        return {
            resultCode: "CMN000000",
            message: "updateNineYuanActivity"
        }
    }

    ,
    // 查询优惠券信息
    "CCQCOI001": function () {
        return {
            resultCode: "CMN000000",
            message: "hello",
            couponInfo: {
                couponName: "优惠券名称",
                couponId: "优惠券id",
                discountType: "折扣方式",
                couponAmount: "优惠券金额",
                couponCodeType: "优惠券代码类型",
                couponMode: "优惠模式",
                accountCouponLimit: "单账户领券数量限制",
                firstOrderLimit: "首单使用限制",
                couponIdVaildPeriod: "2017-3-3",
                stock: "423"
            }
        }
    }

    ,
    // 订单查询CCQOI001
    "CCQOI001": function (data) {
        var pageIndex = data.pageInfo.pageIndex;
        var pageSize = data.pageInfo.pageSize;
        var orderList = [];
        for (var i = 0; i < pageSize; ++i) {
            orderList.push({
                uid: "uid_" + pageIndex + "_" + i,
                cname: "姓名",
                cardTypeTxt: "东趣卡",
                bankTypeTxt: "东亚",
                mobile: "13621715759",
                orderId: i + 1,
                orderTypeTxt: data.queryOrderParam.orderType ? data.queryOrderParam.orderType : "员工订单",
                applyStatus: ["0060", "0070", "0080", "0090", "0100", "0131"][i % 6],
                applyStatusTxt: "信息确认提交",
                createTime: "20170306 12:00:00",
                submitTime: "20170307 12:00:00"
            });
        }
        return {
            pageInfo: {
                pageCount: 100
            },
            orderList: orderList,
            resultCode: "CMN000000"
        }
    }

    ,
    // 补单
    "CCRPLO001": function () {
        return {
            resultCode: "OFRPL00001", //"CMN000000",
            failedOrderList: [1, 2, 3, 4]
        }
    }

    ,
    // 来点用户信息查询
    "CCQCI002": function () {
        return {
            message: "",
            resultCode: "CMN000000",
            uid: "111111",
            mobile: "13621715759"
        }
    }

    ,
    // 统计-申卡统计
    "CCSOI001": function () {
        var orderStatisticList = [{
            "applyStatus": "0000",
            "applyStatusTxt": "获取订单号",
            "applyStatusDesc": "点击“立即办卡”，获取订单号成功即置为此状态",
            "count": "200000"
        }, {
            "applyStatus": "0010",
            "applyStatusTxt": "基础风控",
            "applyStatusDesc": "根据ip、uid、orderId进行风控，风控通过即置为此状态",
            "count": "100102"
        }, {
            "applyStatus": "0020",
            "applyStatusTxt": "办卡浮层",
            "applyStatusDesc": "用户选择办卡浮层上的员工类型及所在城市，进入申卡流程",
            "count": "320102"
        }, {
            "applyStatus": "0030",
            "applyStatusTxt": "开始申卡",
            "applyStatusDesc": "点击“开始申卡”按钮进入基本信息页时，此时已分配orderId",
            "count": "200000"
        }, {
            "applyStatus": "0040",
            "applyStatusTxt": "基本信息提交",
            "applyStatusDesc": "基本信息页点击“下一步”按钮提交到后台",
            "count": "100102"
        }, {
            "applyStatus": "0050",
            "applyStatusTxt": "详细风控",
            "applyStatusDesc": "用户基本信息提交后，根据用户身份证等信息调用公共风控，风控通过",
            "count": "320102"
        }, {
            "applyStatus": "0000",
            "applyStatusTxt": "获取订单号",
            "applyStatusDesc": "点击“立即办卡”，获取订单号成功即置为此状态",
            "count": "200000"
        }, {
            "applyStatus": "0110",
            "applyStatusTxt": "审核中",
            "applyStatusDesc": "上送东亚完毕",
            "count": "100102"
        }, {
            "applyStatus": "0120",
            "applyStatusTxt": "审核通过",
            "applyStatusDesc": "东亚审核通过，由东亚通知",
            "count": "320102"
        }, {
            "applyStatus": "0000",
            "applyStatusTxt": "获取订单号",
            "applyStatusDesc": "点击“立即办卡”，获取订单号成功即置为此状态",
            "count": "200000"
        }, {
            "applyStatus": "0110",
            "applyStatusTxt": "审核中",
            "applyStatusDesc": "上送东亚完毕",
            "count": "100102"
        }, {
            "applyStatus": "0120",
            "applyStatusTxt": "审核通过",
            "applyStatusDesc": "东亚审核通过，由东亚通知",
            "count": "320102"
        }, {
            "applyStatus": "0000",
            "applyStatusTxt": "获取订单号",
            "applyStatusDesc": "点击“立即办卡”，获取订单号成功即置为此状态",
            "count": "200000"
        }, {
            "applyStatus": "0110",
            "applyStatusTxt": "审核中",
            "applyStatusDesc": "上送东亚完毕",
            "count": "100102"
        }, {
            "applyStatus": "0120",
            "applyStatusTxt": "审核通过",
            "applyStatusDesc": "东亚审核通过，由东亚通知",
            "count": "320102"
        }, {
            "applyStatus": "0000",
            "applyStatusTxt": "获取订单号",
            "applyStatusDesc": "点击“立即办卡”，获取订单号成功即置为此状态",
            "count": "200000"
        }, {
            "applyStatus": "0110",
            "applyStatusTxt": "审核中",
            "applyStatusDesc": "上送东亚完毕",
            "count": "100102"
        }, {
            "applyStatus": "0120",
            "applyStatusTxt": "审核通过",
            "applyStatusDesc": "东亚审核通过，由东亚通知",
            "count": "320102"
        },];
        return {
            message: "",
            resultCode: "CMN000000",
            timeBegin: "2017年01月04日",
            timeEnd: "2017年05月04日",
            countInvied: 9999999,
            countApplied: 999999,
            countVerifyPassed: 9999,
            countActived: 999,
            orderStatisticList: orderStatisticList,
        }
    }

    ,
    // 获取商户配置
    "CCMR003": function (data) {
        var pageIndex = data.pageInfo.pageIndex;
        var pageSize = data.pageInfo.pageSize;
        var result = [];

        for (var i = 0; i < pageSize; i++) {
            var item = {
                mid: pageIndex + "_" + i,
                midName: "商户——" + i,
                ruleType: ["0001", "0002"][i % 2],
                rules: [],
                rule: "",
                remark: "备注备注"
            };
            // 0001对应直接返现，0002对应满额返现
            if (item.ruleType === "0001") {
                item.rules.push({
                    cashBackRate: 88.66
                })
            } else {
                item.rules.push({
                    threshold: 5000000,
                    cashBackRate: 30.52
                }, {
                    threshold: 500,
                    cashBackRate: 30.58
                }, {
                    threshold: 500,
                    cashBackRate: 30.52
                })
            }

            result.push(item);
        }

        return {
            pageInfo: {
                pageCount: 100
            },
            result: result,
            resultCode: "CMN000000"
        }
    }

    ,
    // 删除商户折扣配置
    "CCMR004": function () {
        return {
            resultCode: "CMN000000"
        }
    }

    ,
    // 编辑商户折扣配置
    "CCMR002": function () {
        return {
            resultCode: "CMN000000"
        }
    }

    ,
    // 添加户折扣配置
    "CCMR001": function () {
        return {
            resultCode: "OFMID0001"
        }
    }

}

var moduleExports = []
// moduleExports = moduleExports.concat(rights)
// moduleExports = moduleExports.concat(cc)
// moduleExports = moduleExports.concat(qbcc)
// moduleExports = moduleExports.concat(event)
// moduleExports = moduleExports.concat(offline)

moduleExports = moduleExports.concat([{
    pattern: /saveEmpInfo\.json/i,
    respondWith: function () {
        return {
            "result": {
                "resultCode": "CMN000000",
                "message": ""
            }
        }
    }
}, {
    pattern: /getMerchandiseList/i,
    respondWith: function () {
        return {
            responseBody: {
                "merchandiseList": [{
                    "id": 0, //商品id
                    "platId": 1, // 平台id-1:Ctrip,2:Qunar
                    "merchandiseName": "我是名称", //商品名称
                    "nominalPrice": 111, //名义价格
                    "realPrice": 100, //实际价格
                    "stock": 100, //库存

                    "online": 1, //0上线 1下线
                    "weight": 10, //权重-0到255的整数，越大越靠前
                    "thumbUrl": "url", //商品缩略图链接
                    "thumbSize": "10", //商品缩略图大小 -x * y
                    "imgUrl": "123", //商品详情图片链接
                    "imgSize": "10", // 商品详情图大小 - x * y
                    "description": "123", // 商品说明
                    "maintainAccount": "123", // 维护人域账号
                    "catagoryDto": { //类目名称
                        "id": 20,
                        "catagoryName": "132123",
                        "attrList": [ //附加属性，例如 策略id和产品id会在这个里面
                            {
                                "id": 1,
                                "attrKeyId": 1,
                                "attrValue": "123"
                            },
                            {
                                "id": 2,
                                "attrKeyId": 2,
                                "attrValue": "33333"
                            },
                            {
                                "id": 3,
                                "attrKeyId": 123,
                                "attrValue": "Str123123ing"
                            }
                        ]
                    }
                }, {
                    "id": 3434, //商品id
                    "platId": 2, // 平台id-1:Ctrip,2:Qunar
                    "merchandiseName": "我是名称", //商品名称
                    "nominalPrice": 111, //名义价格
                    "realPrice": 100, //实际价格
                    "stock": 100, //库存

                    "online": 0, //0上线 1下线
                    "weight": 10, //权重-0到255的整数，越大越靠前
                    "thumbUrl": "url", //商品缩略图链接
                    "thumbSize": "10", //商品缩略图大小 -x * y
                    "imgUrl": "123", //商品详情图片链接
                    "imgSize": "10", // 商品详情图大小 - x * y
                    "description": "123", // 商品说明
                    "maintainAccount": "123", // 维护人域账号
                    "catagoryDto": { //类目名称
                        "id": 20,
                        "catagoryName": "132123",
                        "attrList": [ //附加属性，例如 策略id和产品id会在这个里面
                            {
                                "id": 1,
                                "attrKeyId": 1,
                                "attrValue": "123"
                            },
                            {
                                "id": 2,
                                "attrKeyId": 2,
                                "attrValue": "33333"
                            },
                            {
                                "id": 3,
                                "attrKeyId": 123,
                                "attrValue": "Str123123ing"
                            }
                        ]
                    }
                }],
                "pageInfo": {
                    "pageCount": 22,
                    "pageIndex": 1,
                    "pageSize": 10
                }
            },
            "resultCode": "CMN000000"
        }
    }
}, {
    pattern: /getReconciliaInfo/i,
    respondWith: function () {
        return {
            "resultCode": "CMN000000",
            "message": "成功",
            "responseBody": {
                "pageInfo": {"pageIndex": 1, "pageSize": 10, "pageCount": 279, "totalCount": null},
                "reconciliaList": [{
                    "reconciliaDtos": [{
                        "requestNo": "13",
                        "accountNo": "1234",
                        "amt": 0,
                        "tradeStatus": 0,
                        "orderNo": "123",
                        "tradeTime": "2018-11-25 19:53:12",
                        "source": "携程",
                        "tradeType": 1
                    }, {
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }],
                    requestNo: "13"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047398631322916106924",
                        "accountNo": "0100081811221100470a1cd2c6000314",
                        "amt": 500,
                        "tradeStatus": 0,
                        "orderNo": "20181121123814177001215860388130",
                        "tradeTime": "2018-11-22 11:00:47",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    requestNo: "20181122110047398631322916106924"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047054330974666066139",
                        "accountNo": "0100071811221100470a1cd2c6000302",
                        "amt": 5000,
                        "tradeStatus": 0,
                        "orderNo": "20181121123105019315848818247661",
                        "tradeTime": "2018-11-22 11:00:47",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047054330974666066139"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "5985293919",
                        "accountNo": "0100001811221514470a057848000014",
                        "amt": 100,
                        "tradeStatus": 0,
                        "orderNo": "0240226",
                        "tradeTime": "2018-11-22 15:14:47",
                        "source": "携程",
                        "tradeType": 3
                    }],
                    "requestNo": "5985293919"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110046937301311003611292",
                        "accountNo": "0100081811221100460a1cd2c7000246",
                        "amt": 7500,
                        "tradeStatus": 0,
                        "orderNo": "20181121122833826633892813688523",
                        "tradeTime": "2018-11-22 11:00:46",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110046937301311003611292"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047483938231803711283",
                        "accountNo": "0100001811221100450a19a5b2000246",
                        "amt": 500,
                        "tradeStatus": 0,
                        "orderNo": "20181121123835411466033815841375",
                        "tradeTime": "2018-11-22 11:00:45",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047483938231803711283"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047224621032647622311",
                        "accountNo": "0100051811221100470a1cd2c6000306",
                        "amt": 1000,
                        "tradeStatus": 0,
                        "orderNo": "20181121123229051105321158469553",
                        "tradeTime": "2018-11-22 11:00:47",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047224621032647622311"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110046832247453934309997",
                        "accountNo": "0100071811221100460a1cd2c6000298",
                        "amt": 1500,
                        "tradeStatus": 0,
                        "orderNo": "20181121122802908660981837216213",
                        "tradeTime": "2018-11-22 11:00:46",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110046832247453934309997"

                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047577403754950457087",
                        "accountNo": "0100031811221100450a19a5b2000250",
                        "amt": 500,
                        "tradeStatus": 0,
                        "orderNo": "20181121123838559520832071897294",
                        "tradeTime": "2018-11-22 11:00:45",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047577403754950457087"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047321638734531959294",
                        "accountNo": "0100011811221100470a1cd2c6000310",
                        "amt": 1000,
                        "tradeStatus": 0,
                        "orderNo": "20181121123738333123027132344297",
                        "tradeTime": "2018-11-22 11:00:47",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047321638734531959294"
                }, {
                    "reconciliaDtos": [{
                        "requestNo": null,
                        "accountNo": null,
                        "amt": null,
                        "tradeStatus": null,
                        "orderNo": null,
                        "tradeTime": null,
                        "source": null,
                        "tradeType": null
                    }, {
                        "requestNo": "20181122110047128786291350858389",
                        "accountNo": "0100071811221100470a1cd2c7000250",
                        "amt": 2500,
                        "tradeStatus": 0,
                        "orderNo": "20181121123142927065784189016707",
                        "tradeTime": "2018-11-22 11:00:47",
                        "source": "携程",
                        "tradeType": 1
                    }],
                    "requestNo": "20181122110047128786291350858389"
                }]
            }
        }
    }
}, {
    pattern: /getCityList\.json/,
    respondWith: function (data) {
        console.log(JSON.stringify(data));
        return [];
    }
}, {
    pattern: /submitOfflineCustCardNO\.json/,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "CMN000000",
                "message": ""
            },
            orderId: 123
        }
    }
}, {
    pattern: /submitOfflineCustIDNO\.json/,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "CMN000000",
                "message": ""
            },
            orderId: 123,
            token: 56789
        }
    }
}, {
    pattern: /bindAccount\.json/,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "CMN000000",
                "message": ""
            }
        }
    }
}, {
    pattern: /WechatAppQRCode\/QueryWechatAppQRCodeConfigList/,
    respondWith: function (data) {
        return {
            "success": true,
            "errorCode": 0,
            "errorMessage": "",
            "content": {
                "wechatAppQRCodeContents": [{
                    "AllianceID": "1",
                    "AppID": "wx0e6ed4f51db9d078 ",
                    "CodeUrl": "https://dimg09.c-ctrip.com/images/zg0k0e00000077rskC3B0.jpg",
                    "CodeID": 1,
                    "DataChange_CreateTime": "2017-02-27T18:00:21.000Z",
                    "DataChange_LastTime": "2017-11-14T17:12:30.000Z",
                    "DataChange_LastUser": "105",
                    "FullPath": "pages/home/homepage?allianceid=1&sid=21234",
                    "OUID": "",
                    "Path": "pages/home/homepage",
                    "PathID": 0,
                    "PathName": "首页",
                    "Scene": "1",
                    "SID": "21234",
                    "SourceID": "",
                    "path": "pages/home/homepage",
                    "dataChange_CreateTime": "2017-02-27 18:00:21",
                    "dataChange_LastTime": "2017-11-14 17:12:30"
                }],
                "count": 1
            }
        }
    }
}, {
    pattern: /WechatAppQRCode\/InsertWechatAppQRCodeInfo/,
    respondWith: function (data) {
        return {
            "success": false,
            "errorCode": 45029,
            "errorMessage": null
        }
    }
}, {
    pattern: /getBill\.json/i,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "PORTALSCQA0001",
                "message": ""
            },
            billInfo: {
                billMonth: "8",
                billDay: "01/03",
                currency: "人民币",
                amount: "4,000,999.12",
                payment: "4,000,999,999.12",
                minipayment: "4,000,999.12",
                payDate: "01/31",
                isClear: false
            }
        }
    }
}, {
    pattern: /activateOfflineCustCardNO\.json/i,
    respondWith: function (data) {
        return {
            "result": {
                //"resultCode": "CMN000000",
                "resultCode": "REALNAMEAUTH000001",
                "message": "成功"
            }
        }
    }
}, {
    pattern: /submitPreOrderInfo\.json/i,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "CMN000000",
                "message": ""
            },
            cusHasValidCard: '2'
        }
    }
}, {
    pattern: /policeRealNameVerify\.json/i,
    respondWith: function (data) {
        return {
            "result": {
                "resultCode": "REALNAMEAUTH000001",
                "message": ""
            }
        }
    }
}, {
    pattern: /creditkernelservlet\/creditkernelapi/i,
    respondWith: function (data) {
        console.log(data.instId)
        return offlineApis[data.instId] ? offlineApis[data.instId](data) : {message: "交易号" + data.instId + "不存在"};
    }
}, {
    pattern: /getApplyStatus\.json/i,
    respondWith: function () {
        // return {
        //     "result": {
        //         "resultCode": "CMN000000",
        //         "message": ""
        //     },
        //     "applyTitle": {
        //         "cardName": "Ctrip-BEA联名信用卡",
        //         "cardType": "银联白金卡",
        //         "cardLevel": "",
        //         "applyDate": "2017-01-01",

        //         auditPassDate: "2017-02-01",
        //         activeDate: "2017-03-01",
        //     },
        //     "applyStatus": {
        //         "applyStatus": "0101", //0080-申请已提交、0090-申请已提交、0100-申请已提交、0101-申请已提交、0110-申请已提交、0120-审核通过、0130-审核未通过、0131-申请已提交、0132-用户取消、0140-已激活、0150-申请已提交
        //         "datachangeLastTime": "2017-03-02"
        //     }
        // }

        return {
            "ResponseStatus": {
                "Timestamp": "/Date(1499913930717+0800)/",
                "Ack": "Success",
                "Errors": [],
                "Extension": [{
                    "Id": "CLOGGING_TRACE_ID",
                    "Value": "7814203205770383212"
                }, {
                    "Id": "RootMessageId",
                    "Value": "921812-0a022627-416642-52722"
                }, {
                    "Id": "auth",
                    "Value": "A6DB40911460039EBF1DCFE0CDE8673299DD4CC572C16D6FD24C2E8D79BCA5DF"
                }]
            },
            "result": {
                "resultCode": "CMN000000",
                "message": "成功"
            },
            "applyTitle": {
                "cardName": "东亚携程联名信用卡",
                "cardType": "银联白金卡",
                "cardLevel": "0066",
                "applyDate": "2017-07-05",
                "auditPassDate": "2017-07-07",
                "threeSeeDate": "2017-07-09",
                "activeDate": "2017-07-11",

            },
            "applyStatus": {
                // "applyStatus": "USER000000", //：出错；
                //"applyStatus": "USER000003", //：审核中；
                // "applyStatus": "USER000004", //：审核通过；
                // "applyStatus": "USER000010", //：三亲预约成功；
                // "applyStatus": "USER000009", //：已三亲；
                // "applyStatus": "USER000006", //：已激活;
                // "applyStatus": "USER000008", //：审核不通过;
                "applyStatus": "USER000005", //：审核不通过;


                "datachangeLastTime": "2017-07-xx"
            }
        }
    }
},
    {
        pattern: /submitExtendInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    // resultCode: "PORTAL000079"
                    resultCode: "CMN000000"
                    // resultCode: "PORTAL000079"
                }
            }
        }
    }, {
        pattern: /rightsReceiveH5/i,
        respondWith: function () {
            return {
                "header": {
                    //"code": 1000,
                    //"code": 1016,
                    "code": 1000,
                    "msg": "操作成功"
                }
            }
        }
    },


    {
        pattern: /getRightsInfoListByUidH5/i,
        respondWith: function () {
            return {
                "header": {
                    "code": 1000,
                    "msg": "操作成功"
                },
                "rightsInfoList": [{
                    "id": 160,
                    "parentId": -1,
                    "rightsTitle": "吴炜杰测试",
                    "rightsSubTitle": "吴炜杰测试",
                    "activityImageUrl": "http://dimg.fws.qa.nt.ctripcorp.com/images/y60d0u00000009c3r0296.jpg",
                    "amountCount": 0,
                    "amountNum": 0,
                    "isShowSchedule": false,
                    "thisAmount": 0
                },
                    {
                        "id": 69,
                        "parentId": -1,
                        "rightsTitle": "天天低价",
                        "rightsSubTitle": "携程内部特价，10元游世界，天天抢！",
                        "activityImageUrl": "http://dimg04.c-ctrip.com/images/y60u0k000000bug6j45EF22.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    },
                    {
                        "id": 161,
                        "parentId": -1,
                        "rightsTitle": "吴炜杰测试",
                        "rightsSubTitle": "吴炜杰测试",
                        "activityImageUrl": "http://dimg.fws.qa.nt.ctripcorp.com/images/y60d0u00000009c3r0296.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    },
                    {
                        "id": 3566,
                        "parentId": -1,
                        "rightsTitle": "跳链",
                        "rightsSubTitle": "跳链副标题",
                        "activityImageUrl": "http://dimg.fws.qa.nt.ctripcorp.com/images/y60s0q000000061r966FB.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    },
                    {
                        "id": 153,
                        "parentId": -1,
                        "rightsTitle": "跳链类",
                        "rightsSubTitle": "跳链类2222",
                        "activityImageUrl": "http://dimg.fws.qa.nt.ctripcorp.com/images/y60s0q000000061r966FB.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    },
                    {
                        "id": 155,
                        "parentId": -1,
                        "rightsTitle": "dingyl",
                        "rightsSubTitle": "dingylsfdasd",
                        "activityImageUrl": "http://dimg.fws.qa.nt.ctripcorp.com/images/y6030u00000009lmq72E6.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    },
                    {
                        "id": 3564,
                        "parentId": -1,
                        "rightsTitle": "1",
                        "rightsSubTitle": "1",
                        "activityImageUrl": "http://10.2.6.249/images/y60g0v00000009cy4A228.jpg",
                        "amountCount": 0,
                        "amountNum": 0,
                        "isShowSchedule": false,
                        "thisAmount": 0
                    }
                ],
                "config": {
                    "pageSize": 10,
                    "pageNo": 1,
                    "total": 7
                }
            }
        }
    },
    {
        pattern: /saveCustDeviceInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    // resultCode: "PORTAL000079"
                    resultCode: "CMN000000"
                    // resultCode: "PORTAL000079"
                }
            }
        }
    },
    {
        pattern: /submitApply\.json/i,
        respondWith: function () {
            return {
                result: {
                    // resultCode: "PORTAL000090"
                    resultCode: "CMN000000"
                    // resultCode: "PORTAL000006"
                }
            }
        }
    },
    {
        pattern: /discardOrder\.json/i,
        respondWith: function () {
            return {
                result: {
                    // resultCode: "PORTAL000090"
                     resultCode: "CMN000000"
                    //resultCode: "PORTAL000058"
                }
            }
        }
    },

    {
        pattern: /queryBalanceInfo\.json/i,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1501036655859+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "6647044048705265597"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022628-416954-50549"
                        },
                        {
                            "Id": "auth",
                            "Value": "A6DB40911460039EBF1DCFE0CDE867322E6FACE1B805C8E5AC0D4150A7DEB183"
                        }
                    ]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "creditBalanceInfo": {
                    "avLimit": "--",
                    "creditLimit": "--",
                    "caLimitAvb": "--",
                    "tempLimit": "--",
                    "submitDate": "07/26 10:37",
                    "tempStatus": false,
                    "tlmtEnd": "--",
                    "dueDate": "--"
                }
            }
        }
    },
    {
        pattern: /getRecentTransactions\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "PORTAL000031"
                },
                recentTransactionsInfo: {
                    recentTransStartDate: "05/15",
                    recentTransEndDate: "06/14",
                    currency: "",
                    currentBalance: "12,000.00",
                    statementDate: "06/15",
                    updateTime: "05/18 12:24"
                }
            }
        }
    }, {
        pattern: /submitEmployeeType\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                }
            }
        }
    }, {
        pattern: /checkUidOrderId\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                pageIndex: 4
            }
        }
    },
    // {
    //     pattern: /getCommonPassengerPersonalInfo\.json/i,
    //     respondWith: function() {
    //         return "data/passengers.json";
    //     }
    // },
    {
        pattern: /getCommonPassengerAddressInfo\.json/i,
        respondWith: function () {
            var list = [];
            for (var i = 0; i < 40; ++i) {
                list.push({
                    provinceID: i,
                    provinceName: "安徽" + i,
                    cityID: i,
                    cityName: "马鞍上" + i,
                    districtID: i,
                    districtName: "雨山区" + i,
                    detailAddress: "详细地址，就是不然看"
                })
            }
            return {
                result: {
                    resultCode: "CMN000000"

                },
                commonPassengerAddressInfoList: list
            };
        }
    }, {
        pattern: /sendVerifyMessage\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                }
            }
        }
    }, {
        pattern: /preProcessOrder\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000" // PORTAL000079
                    // resultCode: "PORTAL000006" // PORTAL000079
                }
            }
        }
    }, {
        pattern: /submitAddressInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    // resultCode: "PORTAL000018", // PORTAL000079
                    resultCode: "CMN000000", // PORTAL000079
                    message: "上海,北京"
                }
            }
        }
    }, {
        pattern: /getRedPacketHelps\.json/i,
        respondWith: function () {
            return {
                "redpacketHelps": [
                    {
                        "helpName": "汪桃",
                        "helpMoney": 69,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/wqDnUkTwXthX016to6xLffIeG105gACaS9fcqx0eAlMJunOicictI18qeIc6cwElgDxia4H894mDiagib43JFfSZibuQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 08:28:33"
                    },
                    {
                        "helpName": "Monica",
                        "helpMoney": 36,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL1IsictRJm4I1njCEGLHp439SSNu6M8yM4roUwsrK21441F10icwnsEc0yBDtND1HxHL9ISMyCOnbQ/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-22 08:25:40"
                    },
                    {
                        "helpName": "lily\uD83C\uDF38佳莉\uD83C\uDF38",
                        "helpMoney": 34,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLz3icr3mGs5ib3vkpCcykicuQ2HV2xl9rxK2L3VBj5deYA91CuWia4omQlGibpbsp5AcUQHkYrvI6jiaibQ/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-22 08:24:43"
                    },
                    {
                        "helpName": "黄翔",
                        "helpMoney": 24,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erQCmNjzBrZj5Ldb9icdLHC1AJFWayIPLNgR2icCMkyyW4bCVicSyPhL58EnHI9rFblkeZib8dZhOzP9w/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 08:11:27"
                    },
                    {
                        "helpName": "\uD83C\uDF3D翁文文",
                        "helpMoney": 22,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqIRyW6n9Lib33wn2D7MbhmKiaxN3IzWXqrF8GoyficiaYdPaQaKsDU2KYTgjzOQSFmbunylGrAqLXoog/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-22 08:03:13"
                    },
                    {
                        "helpName": "凡凡",
                        "helpMoney": 17,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/JbI2I8KnKnx0UxFE7HEqtAMqapPx6V6YltaSeFfzwQYhnhIo6gF2CzXsTp4lB1icmXGG8vicEe4XSzY0sAGalIAg/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 07:44:12"
                    },
                    {
                        "helpName": "张朝欢",
                        "helpMoney": 62,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJWomXBr0yobMLusFIauiaRq8FV5ooRsft4Lowvd1Ucvqzaic6cguyV3fiadFpbLzTf5fSJw4JqjwRMw/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-22 07:40:17"
                    },
                    {
                        "helpName": "七年cium",
                        "helpMoney": 16,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/FH52n2oJ4PPic3pqtTOiccdjSa5S6QynvbuFTOzNQAOKUO4mD9NgHzcvlCIrKXLgA8BDqFPWJWvQ1ZKSiaCiczDUxw/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-22 07:33:52"
                    },
                    {
                        "helpName": "莫问",
                        "helpMoney": 29,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTINp5ia7quuPJoD86usP5cbCkAoVOWEgpcTHrVnyAZRibvwu40wzC1a0BTt3rCIadIkTTepKrGibLC0g/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-22 07:30:47"
                    },
                    {
                        "helpName": "ぺ隨風飄零",
                        "helpMoney": 14,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0ZFGt05ib12SibbJWoAeUicc53wRHKNMM9F6lXvpCC9U78sIibyeAVQcYPOshrxABkBSEtB6nOxiaQibQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 07:16:22"
                    },
                    {
                        "helpName": "\uD83D\uDD31 ™輝\uD83D\uDD31",
                        "helpMoney": 59,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI5QDU194vRT64Y8iao1cOW0krFnOz5buLZvyrvyelgJeiciakWvPeSibj0krmYmEvWKZeibhicc0WZuiaSg/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-22 07:07:29"
                    },
                    {
                        "helpName": "阿兴",
                        "helpMoney": 43,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/YDH3ehzpSkAPA4Z1xndW347Y0Hl9C7a7icn0mQLyw95x17mBKSghMLUmX7O1biaSkyFXkzybM7NTicTK7x4ptcicOw/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-22 07:03:14"
                    },
                    {
                        "helpName": "鱼遇海",
                        "helpMoney": 16,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqU3zyhmRgfHZjlXwUaWcbEazOTaFRoWRCT3ibnlBTxgS1LTYPgiaIDevg46QwmapVy4Wb3guQT9bAQ/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-22 02:40:28"
                    },
                    {
                        "helpName": "Exception",
                        "helpMoney": 41,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/amVCsIbZxRTqYwCicLaKic8VwlvTvPEGhf97Mtia0M6cuG2qOUZEU03c6ugZqT90diaqNY2ONHer8x8B0la77gxU9g/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-22 01:05:45"
                    },
                    {
                        "helpName": "肖冲",
                        "helpMoney": 45,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIImbb2DpLCoEpDicnk5CEocWicPDAeAAQmgn1Gk9nUqx0XMW3NUAaFmCzrhc9bUzx6WmegEnwFKrTw/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-22 00:45:40"
                    },
                    {
                        "helpName": "\uD83D\uDC97体温",
                        "helpMoney": 40,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/OYFfUAcaJCHAyp7ia6mwicgK32BfJoiapUhnSL6vtFCFk05uzGZ7iacCl9TgoxImIDEC3Nic2uzHgEvFFoO6JvHelzg/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 00:39:50"
                    },
                    {
                        "helpName": "kkk",
                        "helpMoney": 54,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKaS5LY4oRI7th6RRnFElNvnnfzbVU7VIvGoVwgc5uXcNricurH41TB2WN7CbD82E5VHIPicvwb3p1Q/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-22 00:33:40"
                    },
                    {
                        "helpName": "子龙15072921891一",
                        "helpMoney": 42,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoGtqDt9bjmqrdoazoJI8d7uxYs7pic604iaaeBpP8B5UA9iabYicqpDgHyibU5omEibrzq2dDUicFVT1RHw/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-22 00:32:10"
                    },
                    {
                        "helpName": "汤妹",
                        "helpMoney": 59,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/CP7jPacsylKAO5qwB2lY02BH4QB2Zrb1uiagj5R9tXyicibYCMvTNscK8s1DPMC2hPC3Ectcvf5hlLjqfoqobbiaCw/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-22 00:30:12"
                    },
                    {
                        "helpName": "爱吃猪头肉",
                        "helpMoney": 32,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKnHSs5L1YzxSVicEjNrA3SaXyzkf6AoFRBdJYuicerMo7k9I5cl7NJx7CcabSQsrVsuVSazHTzuBbA/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-22 00:28:56"
                    },
                    {
                        "helpName": "別吵醒了記憶",
                        "helpMoney": 53,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er5XWA2sjukqX8OojiaEib3b8L8usRvTI6bicOZJepXibK7yIdxSsia4ma9XldpE7cIibn3y1dRBoUh8O9w/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-22 00:24:12"
                    },
                    {
                        "helpName": "坏人师兄",
                        "helpMoney": 34,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgAIgXrkB4tprmxmW6mCyVMUcTNpX4t7ibWVBOmnUAEPWpElzRO9yibicWL7RU6UPDp70ZINZ6xsBg/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-22 00:24:03"
                    },
                    {
                        "helpName": "王鹏宇",
                        "helpMoney": 30,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWoZTcppN58cSAoJYsGVuwcFt7Gf58I7ic3HiaqkdS8honDwWn9qmJb6RtS6icldQEwPt56dz5xiaM1w/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-22 00:24:03"
                    },
                    {
                        "helpName": "小强哥",
                        "helpMoney": 27,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erF9xlnuavLCViaOYfqrDmVcbhxEbphECknHsMGUXFyVv6OZSe6XCqQiaqqcWf7POVPlYiaW1thf3kyA/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-22 00:23:44"
                    },
                    {
                        "helpName": "Johnny (赵宁)",
                        "helpMoney": 53,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/aSzCicAibCOj0kmuVOUnWARZDK29bNTdV0p73Zoiaod6Wia2Jobb6ZWdA6ZrCJ5lhXCrBFycNfb18qhqiceqwxN1kyg/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-22 00:21:29"
                    },
                    {
                        "helpName": "金军",
                        "helpMoney": 32,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIJ2bFk9MRAClscWVTicIkr2a4TR0gEKMiclheGEmicFe5O9Izsx6suXG1ibqgbia1uoQn0CTYX4KFb1wQ/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-22 00:16:16"
                    },
                    {
                        "helpName": "A（cjc)",
                        "helpMoney": 63,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJOc0n02eNKfmZkH2A0oIow8tk9m3To3lpGXLlIStLDoMo0hoAuC9P1jRSQNcANIhhWB1LLLaYy0w/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-22 00:04:35"
                    },
                    {
                        "helpName": "A\uD83D\uDC97全家幸福\uD83D\uDC8B",
                        "helpMoney": 20,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKUdkK5dVTueicpQmm34NZNzdzTTGgUR1MicCYxX432qsqibibh9VTv0pnWn1NpBrWCbmyNysvTM8PnpQ/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:58:17"
                    },
                    {
                        "helpName": "Q拉",
                        "helpMoney": 11,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELl77AfTbu8OfMBUIYFh4E9mUnVO2n7ZGZwO4WibwGXb1OMxX9Wb4AK9oMWUKZy7hVZZQ9Mpranxfg/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:56:43"
                    },
                    {
                        "helpName": "婷宝",
                        "helpMoney": 37,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/k0tGZBE0lZYlecotN3yib3H0H4H41RLhKBPughWRK0toDoneqlVR0f85HFBdibnjdOuicdca9kgS6pDeAIPmmGc9A/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:56:17"
                    },
                    {
                        "helpName": "蔷薇",
                        "helpMoney": 39,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erwv9tGxiaVTZEg4qKROc4uRREC6LiaRKMWYML7PRNVroSWezXQLUicvmRKO02Kr28DMsDRgxW1RoXlw/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:54:25"
                    },
                    {
                        "helpName": "韩国童季宝贝摄影引导师小冉",
                        "helpMoney": 61,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Hv1n1Mw83LKriaVTzLVBj28QTTjf9ibsEic5AUq1ZdxH6vdialRwlTYfsRyBWP4w0vAVIB8s8QlCtibUnuLzGU1vZJw/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:51:39"
                    },
                    {
                        "helpName": "南的方",
                        "helpMoney": 41,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epjdWhOia2BKpvxWlXnxLMeqqGkdch7CLX1wlH2IlFCvKyibgqsDEw4MibxIXBdQFH0UqT9MLicsFoGtg/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:50:24"
                    },
                    {
                        "helpName": "南南",
                        "helpMoney": 20,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgxl2HH0aaN7MNTWTMiaReut5yxtdXZK3coUgiaphoxRJ21fMOETKBITjcQDszMXMiccdFXxodLJnmw/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:46:54"
                    },
                    {
                        "helpName": "Joyce \uD83D\uDC8B\uD83D\uDC60W蓓蓓",
                        "helpMoney": 43,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhxoZ6bkcgZcdDLriac5TDnW9guMFWRv1oy1iaRztrs39tk41mgCsick7ccxdIwzUBjzEWLpJ1Tnb6w/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 23:43:28"
                    },
                    {
                        "helpName": "天儿",
                        "helpMoney": 34,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep0Cb1HGLBTD14WSkeNkHsKhQ2END8Q7kr3ark1JHfrFFMKNVL4laWs8WWodL9bBicpSg0s0QKdUTA/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:42:49"
                    },
                    {
                        "helpName": "MmXu\uD83C\uDF88",
                        "helpMoney": 65,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLERLpErfNmowCTpNbEUAsTmzVEV3TT75p5hbUonU3GObPccj0KJk1LSE4Yl4CpvLkvAyUwDu9CEQ/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:42:46"
                    },
                    {
                        "helpName": "微微",
                        "helpMoney": 54,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbxIPfCRw9M47InFaeJpAicIGYpLUKBGJKn6G9c0U642sNic2OTw8ppYH1WMk2Qmt1ysdibhGu5sJ9w/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:39:08"
                    },
                    {
                        "helpName": "Tirua酱",
                        "helpMoney": 35,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep9EV0dkHJtUKwxsOUtrg0VtC0tHzEgZzLqFkC5nSj41M5lM2uNUElctlEsUuf7rQ5H2gNFwO0png/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:39:04"
                    },
                    {
                        "helpName": "王小花",
                        "helpMoney": 35,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eotuhVFN9phZojmSQheUqHl0OAdFBH1ruFia33TkFA8uTicrhzeYmDTmjpRnN7EUd6QUrCDvicC1QAQw/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:38:00"
                    },
                    {
                        "helpName": "Lydia（章雁）",
                        "helpMoney": 38,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIovFO0icqOWLVZnEYUmvL96vGD8CukHA8uXbLyZP0SMz8HZxbsBBR6Mcw0ohA1j3snXA8mhvMJaKg/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:36:28"
                    },
                    {
                        "helpName": "莉\uD83C\uDF75",
                        "helpMoney": 62,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLg0siaLsPDTDUkD0rUF9s7eRxBJiaWvfOc14hibfIOh7ic3VFGDfLCIHnnSQz1ljgKBmubfhfoIiaLLTQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:35:56"
                    },
                    {
                        "helpName": "Tirua酱  冬眠前的忙碌",
                        "helpMoney": 33,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/8jIrzdqccO56q2UHb6DYCj7wvtl9QiaodaicWpbXLG7QZNuibTbxskln8icJAlKj3auCFcOUXOiaShzB4QTOaKhTSEw/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:35:55"
                    },
                    {
                        "helpName": "Max",
                        "helpMoney": 53,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epSiaMbPwFeANU4NF2VohKruGMuBibBWHMmxQcs0hcJvXFrSakkOD2wO21jlpMdNBpUy596zohAwRXg/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 23:34:19"
                    },
                    {
                        "helpName": "蓝天",
                        "helpMoney": 26,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/kQviaoWtNgHwYoGa5QhnlG4sE2wLicR3ibaiaacAv9RJ83flEs0eUALibVZq2yGJ8k4N27UxNichzeLG4jRYzNFasRgQ/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:33:59"
                    },
                    {
                        "helpName": "好久不见",
                        "helpMoney": 36,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epbWWfwR0RkEdfCYN2ak8y3A3IeqZmQs6icpOgjoZcEeg9pDzyicLPpsEmNsfrq25rB66OgEtTfZ0iaA/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:30:56"
                    },
                    {
                        "helpName": ".",
                        "helpMoney": 45,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epFRuH5bX8R0IJ7qF2dyLr0gdZqaaM9h9pIQp0OJD1f6xjxrknxEnzhNiaLHEMFHe1ibS7dicltXShsw/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:29:52"
                    },
                    {
                        "helpName": "章鱼丸子",
                        "helpMoney": 60,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKTcgPkeGEEYu3ZQqgyBP7wibblUc9rdLcsCGGHicQ6Icu2te4WEDviaepM0BPbqdicotuBiaW3PKqH7qg/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:28:47"
                    },
                    {
                        "helpName": "\uD83D\uDC30jixiang小样",
                        "helpMoney": 64,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLERLpErfNmoibFxQffQmbz66rPmlGoib7xYZYqAdUGszKdHvpkrBBhUQYnpW0Epk7IH7nU9jQRrUlg/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:25:43"
                    },
                    {
                        "helpName": "꧁༺敏༻꧂",
                        "helpMoney": 67,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI9B4IQO1L72VT9M0tLsZ9kjchCsf2ia5YuvkRhicTEdVLCj51h88vRvylgsB2kAJVJB4YLL3icc7prA/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:25:34"
                    },
                    {
                        "helpName": "15721426332",
                        "helpMoney": 19,
                        "helpImage": "",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:23:49"
                    },
                    {
                        "helpName": "马小咖",
                        "helpMoney": 2,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrtq9n5cWKf8ZL7bk3NVSia3bTKibUp6696unbYgpSahNLjrBgRL3fMYiauEV9TLBPZicVP59swwdN9g/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:23:15"
                    },
                    {
                        "helpName": "L",
                        "helpMoney": 28,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI5uDOruARAmBEnD140M0rXwgjia1Xo2PtbsEWic9KYibsBoqlRNGcvB45Rgd6IJiaXt9tiahjUBtJWicMA/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:22:08"
                    },
                    {
                        "helpName": "\uD83D\uDC2F三毛",
                        "helpMoney": 11,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLEeuU0mPDYElZNluqzWJvBJ0FHAVZj2DMQC4y6B6QR3dSaGpmZm1I7WopYThsCiaSnck0zicnKHE8Q/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:21:35"
                    },
                    {
                        "helpName": "韩韩",
                        "helpMoney": 29,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep9EV0dkHJtUNcypAeTg9vnBr337Yl3P9cgicHwYjHwNDicgYTdOhFxNDtAFn1Kmk0tN9bJwM8TVNCA/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:21:04"
                    },
                    {
                        "helpName": "AAA演出℡₁₈₇₀₂₁₂₉₂₈₁",
                        "helpMoney": 26,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIImbb2DpLCoHHhQ7GCjz3OwIwcjOjrNMYpyZr3TZ2maw3Smr7iaux7AC4lW0wCq83P63gJcZiazqnQ/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:20:21"
                    },
                    {
                        "helpName": "W楚梦雅雅",
                        "helpMoney": 15,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJmFzSicR3biaegvlZFuRwOztN0Xr4jRic0yk5oGwp3WDuribY8YLMwicuf0gvibwiaDOXX2c7ibN6sbz93TA/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:19:45"
                    },
                    {
                        "helpName": "佐小鼬｜要少说话",
                        "helpMoney": 19,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erf1o3QrluWmXUG7Eh56XHA0jITS1O1OQ8WSUxDp5lkxoJcCvOjhpRjeOtwd3jmQcOE84lDt5Rp1w/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:19:14"
                    },
                    {
                        "helpName": "9酱紫爸",
                        "helpMoney": 2,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erXNPkTmjcZ1ia26Com6WYhJ44JsicTEicKlYvc8v3wVCD41yJiacqLicKzxwzn9W6lFAQib8zDe0F7vLVQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:18:25"
                    },
                    {
                        "helpName": "上海林优*无法",
                        "helpMoney": 2,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBtzficN8xtZ7LYB8iaIcqefX2iblA5fJpqoHsAy3Ikob8SBUzmhHM9ZzbG0sNtxSicHUwDicHJWb5J0A/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:16:03"
                    },
                    {
                        "helpName": "雨儿",
                        "helpMoney": 25,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK1zZ7icsZIYaWiaRyddnQGZ7VhMSxw879iavlB8RiavKVx5oiboiaxPMeDv799UmruUibzAicup50jdECp3Q/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:15:49"
                    },
                    {
                        "helpName": "皮9.",
                        "helpMoney": 26,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI7y8gfkxkD9LicBvEuKLPicnw8JPF60N40R9gvvJfcIk8cuKMXaibolJ0OmA8zb41s5ug8wXyC6DYYw/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:15:32"
                    },
                    {
                        "helpName": "就是个名字",
                        "helpMoney": 2,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er3UZQu2BwYNhWJ6BcGia6jVWmX0BGqsq2ejIfVvTmU1ibyibEt1cxQwwRUmTo85ctflJjwzfaFQvLsg/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:14:13"
                    },
                    {
                        "helpName": "罗梦麟",
                        "helpMoney": 11,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/NibfZOQCc73CEQg0p7w13IMEEMYYdRz0mZicuAH61oh2m0QUCibibib36LN44GMo34hsXomd9AKRRUouY0o6qLfY2Zw/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:13:36"
                    },
                    {
                        "helpName": "donny",
                        "helpMoney": 7,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/LdMO37dPCUxEpJIticn9hqXSoA7HVfO2PTUFJ0ohMU5yA90JjmI0db2JFzcniae0FDficuzH2tYPQbpsoTBQ6snnQ/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:13:15"
                    },
                    {
                        "helpName": "Ethan J",
                        "helpMoney": 29,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/WbkGsUsNrUwdg4tQAvY4vIUSK04IHTaDC0GLxV4Zib4IZGflCWxKv8B705GibJmCmgXar6987EPeoFVWJUO67SyQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:12:48"
                    },
                    {
                        "helpName": "陈莉\uD83C\uDF49",
                        "helpMoney": 9,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIwbHuA4O3meplMP5sGKgkVpw2gVWfaXWCibo9alY4pnfJzXiaOzPSIrUr8S7h9IsPzZmC2ibk9CFFuw/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 23:10:42"
                    },
                    {
                        "helpName": "肖健",
                        "helpMoney": 30,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/2zGClHFjNiaxWHsutpibPKIKQJKz0pC5y9gYNaN1EdKT8vvXxR4O4IzDlXx7gEDibCKkicDaKhC96RcEQmHctR1wBg/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:09:49"
                    },
                    {
                        "helpName": "Zhe Wang",
                        "helpMoney": 21,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/n1gS0knXOF4tTsicDwasfalMqSYE8zAYsy1yutWVCPicgLWDt8LygXC663FKpKnp4YdIuoNHCzbHKy7ftZKe95sQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:09:16"
                    },
                    {
                        "helpName": "小熊·Vivian \uD83C\uDF38",
                        "helpMoney": 8,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKOiapmSZbkPzGGWEAyXwatuFYyDLvbrWvo2gufSsZpibrcQbbWBhMrfn6mftu6ILEf70k1OicKu7t7w/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 23:09:05"
                    },
                    {
                        "helpName": "园园园园园子echo",
                        "helpMoney": 5,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIecl6icbuv7x5pgxBn89NO82mhbGpHMlKoQjIY2stDkkwJY36DhCibfyOaF20IeQwJBkltMrTG9EAA/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:08:41"
                    },
                    {
                        "helpName": "Richard.Yu",
                        "helpMoney": 11,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJK1dsrun2K659Jv2VCH4wfxrib9SVVCl6XGF0CAhfIjoMQRKBInEToCUBianGAqKqNXURkvicSjV4nA/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:08:20"
                    },
                    {
                        "helpName": "阳光少年",
                        "helpMoney": 10,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjAggFqmebIGTloxDM4qQE4ufhttT1gKbJobc1uDap3nVkI0Tzn5BhKH1icdofNic8kwOIkyEkzic6Q/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 23:08:17"
                    },
                    {
                        "helpName": "沛哥哥",
                        "helpMoney": 14,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/LARZiaIx7Istv9NkkxZ7Q7sKwa9vZqCImwv1xn78IwkwAgClnicYqtDwbbVAAXjRzEHlxYL7JWyOxNESvCOybD4Q/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:08:15"
                    },
                    {
                        "helpName": "Pure beauty",
                        "helpMoney": 7,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eooIWO7vBhZKTW7YNtU3n7d3CozMBKOjib1pXJib9a6NIjIUlUVPgz1NhaCSiapoNpia7tZq2YvQlStdg/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 23:07:59"
                    },
                    {
                        "helpName": "A.nn❄️",
                        "helpMoney": 3,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqc6icJNBGREtIF3fERx2BRLeOOL85CMwiclzgPwibCxOpkcmPupZicjaicr9dZxvF2Rh9h6SsB2Ph0zXg/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 23:07:53"
                    },
                    {
                        "helpName": "水能载舟亦可赛艇",
                        "helpMoney": 12,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/N8WHcPZU6LCtxCKspV8MSdiaibfUR1BZEvdnr16iczYehgAQyvDark67PvRjN0EIQ6J0btJvMdUMomJUfnwxoibw9Q/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:07:16"
                    },
                    {
                        "helpName": "郭绍伯",
                        "helpMoney": 14,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erqKgQ1CzEU2TWevOIiaT2z4CJfYUtQ6W4qich3d7jFEw8n71nalPHW7HVvBTlNxbtOrYAfgnOM4amA/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 23:05:41"
                    },
                    {
                        "helpName": "\uD83C\uDF53 蕊",
                        "helpMoney": 13,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgxl2HH0aaNxYCgD9LXHkuia9VSbdGIwYXpeWr454Vr1TZCoTIdPO2WMtgSroKe4c2BwQhNSibh6aQ/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:05:11"
                    },
                    {
                        "helpName": "小胖妈",
                        "helpMoney": 18,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL6d9KWg44qDWzUicmVjXTKkeqYpwibFiaWu006WXgTbgTvWoArhqzn0405qxjGXXcNBUImic3cIZXibXA/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:04:44"
                    },
                    {
                        "helpName": "陌颜.",
                        "helpMoney": 2,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ert5MmUrkTiatQXlVrVibQrUVN8aoq9dTiaR7TmGeHUGo7lcNeibus1OnIxCtcxRGx1oU3weOYPB0oK9Q/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 23:04:40"
                    },
                    {
                        "helpName": "郭憨憨٩(˃̶͈̀௰˂̶͈́)و",
                        "helpMoney": 16,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Aicia76LribU1pmKzTC4yClicUdiajturlpze96Tj04W1AibJ6k67iczVXBfo70cOKT7BWJEto5ANzy9ySdxOJ6LlTIuw/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 23:03:40"
                    },
                    {
                        "helpName": "Xx",
                        "helpMoney": 8,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/nE4GrbxL2qj9dZD1gvIPtJMEgJghAeqgkg7AfzRXSx8LfJxRbeLicb1P37XwyVlr6bP7ZlY6NWA04X5e5zSvbPQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:01:13"
                    },
                    {
                        "helpName": "\uD83E\uDD99\uD83E\uDD99",
                        "helpMoney": 14,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgAIgXrkB4tOdNZXA5JVC7l7jLJqPZFJ7Hdd8azhshibq8e4gUia8AD1kiaNb7jUqibASzzicldAXEsw/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 23:00:32"
                    },
                    {
                        "helpName": "上海小春哥",
                        "helpMoney": 15,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgxl2HH0aaN56VbyTn3TWFewb0ylKUIOktxb48mlwmhlO6krGvyOARvPTqGSRXSnzRG9uYUxxaEA/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 22:59:31"
                    },
                    {
                        "helpName": "YJ",
                        "helpMoney": 16,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5ud2qLuP9jkZfI75WPfBeEu2WMKBJ2APnlenErRxd0GEibxadEFDuibJcEiaOFrYHl1NLAs4STmbXQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 22:52:20"
                    },
                    {
                        "helpName": "张小引",
                        "helpMoney": 17,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLe47f8YjiaGeN4ia1HWA5tuZG3nZTngkHWwWnZd8zZcZ56tCas4mhbhvQ3J6OJtF9G7aXCGpvvbRWg/132",
                        "slogan": "红包翻个倍，回家靠兄dei！",
                        "datachangeCreatetime": "2018-12-21 22:49:46"
                    },
                    {
                        "helpName": "朱虹",
                        "helpMoney": 12,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8ibdFyBs3LIB2WrRyOKUS8yoJD1D7SFiaWibicdj0lpiarw42jk05bWR5daM70QSP7dx53EZbfWIice1A/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 22:47:09"
                    },
                    {
                        "helpName": "L.",
                        "helpMoney": 19,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/vCgOiaXVSay5TgTEwCYbNxiaM6I04yLX0rZACdpfDX3S9r4g3jsnEKicPBia8R7JiaNz3K5N5YOlBPIiaYiafObtKiaS0Q/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 22:47:05"
                    },
                    {
                        "helpName": "Ms.Wu",
                        "helpMoney": 13,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epjdWhOia2BKpj0VqaRIdBicHwyBtLrprZhLpBnlhaBeicgg1puCOAU8Qf1CiafpicfIJZH76ibsHLN3bBw/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 22:46:55"
                    },
                    {
                        "helpName": "吴谦",
                        "helpMoney": 28,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLTPmSgD6QSgibxFVlfHkMXuC24bjYtwTTtJibtlGf6KQUfr0L6MumZn09porQcksNkUpy6sw1abwqA/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 22:46:29"
                    },
                    {
                        "helpName": "陈WY",
                        "helpMoney": 96,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkQc7PfrbBqOWd99Nia0tKyPHyvsbyEJEPUGuagTH1oicML7YohKYpbVzubQ03XNHLHE01UpvxYGyg/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 22:46:13"
                    },
                    {
                        "helpName": "小源",
                        "helpMoney": 49,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/cwrzcCpDrrj8L6pSib0pReGIXmX1gPVGVRG6yVekjqk7EDaEZ5ZwUYqWf8fR8xmKVgibYJ726J146kVcF2ktzP3A/132",
                        "slogan": "你总是这么优秀！",
                        "datachangeCreatetime": "2018-12-21 22:45:16"
                    },
                    {
                        "helpName": "吴超",
                        "helpMoney": 30,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoQ5y7zdJiaicjMRXBceyXbHRls9jNq3CAvJ2CwqfAqblU1TOicQ6ac47FUE8gb2QdibCcbMyJglDZrXA/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 22:44:24"
                    },
                    {
                        "helpName": "Lydia",
                        "helpMoney": 23,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIicaAGvudKljWibPrZkgqZfeicUGNxGpPo73GRicsQcTS6hBiazsnhX4fJeh9vicwViaCOfbls7HRmLYK6A/132",
                        "slogan": "最佳老铁就是你啦！",
                        "datachangeCreatetime": "2018-12-21 22:42:59"
                    },
                    {
                        "helpName": "孙丽阳",
                        "helpMoney": 77,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrtq9n5cWKf0GVsU3IcCDkduLAia0Ox9mqZDxaG9PNF57aPWgxNnzMB6FY3JcSBWU0AOfIr105Log/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 22:42:29"
                    },
                    {
                        "helpName": "魏巍",
                        "helpMoney": 82,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbuk1m71mphMic6mUGcAVAjojyLhfNb1uPNeeyJ6Bx4PQAnB6IshCyaFwHib5yfc87ibwJKqichk9CTw/132",
                        "slogan": "助个力，让红包翻起来~",
                        "datachangeCreatetime": "2018-12-21 22:42:28"
                    },
                    {
                        "helpName": "姚强",
                        "helpMoney": 46,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/g3KGxVI6KiaYvCBoerzQSn1SeSicFdFQpjt47CL6DZrMvJUOCDAgxOmHdL4R2XOia0eZR0uSPrQ0m7RiaKfxKMPPMQ/132",
                        "slogan": "确认过眼神，是助我回家的人！",
                        "datachangeCreatetime": "2018-12-21 22:42:27"
                    },
                    {
                        "helpName": "不二苗鹤",
                        "helpMoney": 47,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKwePrwC4delDErv1lxZLvuj6rPicQF3pydSjadLCQibdEsqzDL5mth1rRqia60QL56HuNGYNIibXaibwg/132",
                        "slogan": "送人玫瑰，手留余香",
                        "datachangeCreatetime": "2018-12-21 22:42:24"
                    },
                    {
                        "helpName": "小云",
                        "helpMoney": 22,
                        "helpImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgxl2HH0aaN10au3mqNzVrcuLbnbVfmjma1EqVnpIWzVTZ27ybWe7bVAyyWr2ibLTQPa9Q8YwnXPQ/132",
                        "slogan": "出手不凡，红包翻翻儿",
                        "datachangeCreatetime": "2018-12-21 22:42:22"
                    }],
                "ResponseStatus": {
                    "Timestamp": "/Date(1549943810929+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [
                        {
                            "Id": "CLOGGING_TRACE_ID",
                            "Value": "2724825876540256618"
                        },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a0f9035-430539-3311271"
                        },
                        {
                            "Id": "auth",
                            "Value": "641086214F4722B0F83EB596B03214DC1BBD1D27A83C15CC0416F8668916D899"
                        }]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "pageInfo": {
                    "pageIndex": 1,
                    "pageSize": 100,
                    "pageCount": 100
                }
            }
        }
    }, {
        pattern: /getRedpacket\.json/i,
        respondWith: function () {
            return {
                //"redpacketId": "10973be40109ed408a75af5e9e93cb5b",
                "redpacketMoney": 588,
                "helpNum": 0,
                "helpMoney": 0,
                "redpacketMultiple": 1,
                "nextRedpacketMultiple": 2,
                "nextHelpNum": 10,
                "receiveStatus": 1,
                "activityStatus": 1,
                "receiveStopDate": "2019-03-12",
                "cardStatus": "0000",
                "reachStatus": false,
                "helpStatus": true,
                "ResponseStatus": {
                    "Timestamp": "/Date(1550057206972+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [
                        {
                            "Id": "CLOGGING_TRACE_ID",
                            "Value": "3198265762000966067"
                        },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022627-430571-62602"
                        }]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                }
            }
        }
    }, {
        pattern: /openRedpacketForAPP\.json/i,
        respondWith: function () {
            return {
                "redpacketId": "10973be40109ed408a75af5e9e93cb5b",
                "redpacketMoney": 588,

                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                }
            }
        }
    }, {
        pattern: /getIssuedCity\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000" // PORTAL000079
                },
                issuedCityList: [{
                    cityId: 1,
                    cityName: "荆州",
                    isIssued: 1
                }, {
                    cityId: 1,
                    cityName: "上海",
                    isIssued: 1
                }, {
                    cityId: 1,
                    cityName: "荆州",
                    isIssued: 0
                }, {
                    cityId: 1,
                    cityName: "武汉",
                    isIssued: 1
                }]
            }
        }
    }, {
        pattern: /getAccountInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                accountInfo: {
                    userName: "实名认证",
                    idNo: "341621199001053716",
                    mobile: "13621715759",
                    email: "test@ctrip.com",
                    isAuthorized: 1
                }
            }
        }
    },
    {
        pattern: /getAccountInfoByUid\.json/i,
        respondWith: function (data) {
            return {
                "result": {
                    "resultCode": "CMN000000",
                    "message": ""
                },
                accountInfoNew: {
                    userName: "楚乔",
                    idNo: "210311198502025015",
                    idType: "03",
                    idValidDate: "2020-10-10",
                    mobile: "13999998888",
                    email: "85465@qq.com",
                    isAuthorized: false,
                    isCtripAccountSelfInfo: true,
                    enName: "wer ewrwerwerer",
                    enLastName: "fdferer",
                    enFirstName: "dfdf"
                }
            }
        }
    },
    {
        pattern: /isCardHolder\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                /**
                 USER000001 ：未申卡；
                 USER000002 ：申卡中（未提交）；
                 USER000003 ：审核中；
                 USER000004 ：审核通过；
                 USER000005 ：审核不通过
                 USER000006 ：已激活
                 */
                //status: "USER000001",
                // status: "USER000002",
                //status: "USER000003", //审核中
                // status: "USER000004",
                // status: "USER000005", //审核失败
                status: "USER000006", //已激活
                orderId: 2252420107,
                orderType: 1 //邀请码+0,1,2 || 5,6,7
            }
        }
    },
    {
        pattern: /submitBaseInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                /**
                 USER000001 ：未申卡；
                 USER000002 ：申卡中（未提交）；
                 USER000003 ：审核中；
                 USER000004 ：审核通过；
                 USER000005 ：审核不通过
                 USER000006 ：已激活
                 */
                status: "USER000001",
                // status: "USER000004",
                // status: "USER000003", //审核中
                // status: "USER000006", //已激活
                orderId: 2252420107,
                orderType: 1 //邀请码+0,1,2 || 5,6,7
            }
        }
    },
    {
        pattern: /submitApplyOrder\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                orderId: 2252420107,
            }
        }
    },
    {
        pattern: /submitCompanyinfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                orderId: 2252420107,
            }
        }
    },
    {
        pattern: /checkFlightCouponUserRight\.json/i,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1529650079486+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "1825360441065928587"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022628-424902-106672"
                        }
                    ]
                },
                "result": {
                    // "resultCode": "PORTAL000112",
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "activityId": "A201806002"
            }
        }
    },
    {
        pattern: /receiveCoupon\.json/i,
        respondWith: function () {
            return {

                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "activityId": "A201802001"
            }
        }
    },
    {
        pattern: /queryPayStandByActivityList/,
        respondWith: function () {
            return {

                "resultCode": "CMN000000",
                "message": "成功",
                "pageInfo": {
                    pageCount: 22
                },
                responseBody: {
                    "payStandByOrderInfoList": [{
                        uid: 1,
                        orderId: 2,
                        orderDate: '2018-1-1',
                        standbyMoney: 122.11,
                        orderMoney: 333.22,
                        commercialName: 'aaa',
                        userType: 1,
                        refundStatus: 1,
                        referenceNo: '123'
                    }]
                }

            }
        }
    },
    {
        pattern: /getSurveyInfo\.json/i,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1529657607178+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "8505466425856608288"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022627-424904-123661"
                        }
                    ]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "surveyInfo": {
                    "sID": 1,
                    "title": "调查问卷1",
                    "qustionList": [{
                        "qID": 1,
                        "qType": 2,
                        "qTopic": "单选11",
                        "qNO": 1,
                        "optionList": [{
                            "oID": 1,
                            "oContent": "选项111",
                            "oNO": 1
                        },
                            {
                                "oID": 2,
                                "oContent": "选项112",
                                "oNO": 2
                            },
                            {
                                "oID": 3,
                                "oContent": "选项113",
                                "oNO": 3
                            },
                            {
                                "oID": 4,
                                "oContent": "选项114",
                                "oNO": 4
                            }
                        ]
                    },
                        {
                            "qID": 2,
                            "qType": 2,
                            "qTopic": "单选12",
                            "qNO": 2,
                            "optionList": [{
                                "oID": 5,
                                "oContent": "选项121",
                                "oNO": 1
                            },
                                {
                                    "oID": 6,
                                    "oContent": "选项122",
                                    "oNO": 2
                                },
                                {
                                    "oID": 7,
                                    "oContent": "选项123",
                                    "oNO": 3
                                },
                                {
                                    "oID": 8,
                                    "oContent": "选项124",
                                    "oNO": 4
                                }
                            ]
                        },
                        {
                            "qID": 3,
                            "qType": 2,
                            "qTopic": "单选13",
                            "qNO": 3,
                            "optionList": [{
                                "oID": 9,
                                "oContent": "选项131",
                                "oNO": 1
                            },
                                {
                                    "oID": 10,
                                    "oContent": "选项132",
                                    "oNO": 2
                                },
                                {
                                    "oID": 11,
                                    "oContent": "选项133",
                                    "oNO": 3
                                },
                                {
                                    "oID": 12,
                                    "oContent": "选项134",
                                    "oNO": 4
                                }
                            ]
                        },
                        {
                            "qID": 4,
                            "qType": 2,
                            "qTopic": "单选14",
                            "qNO": 4,
                            "optionList": [{
                                "oID": 13,
                                "oContent": "选项141",
                                "oNO": 1
                            },
                                {
                                    "oID": 14,
                                    "oContent": "选项142",
                                    "oNO": 2
                                },
                                {
                                    "oID": 15,
                                    "oContent": "选项143",
                                    "oNO": 3
                                },
                                {
                                    "oID": 16,
                                    "oContent": "选项144",
                                    "oNO": 4
                                }
                            ]
                        },
                        {
                            "qID": 5,
                            "qType": 1,
                            "qTopic": "填空1",
                            "qNO": 5
                        }
                    ]
                }
            }
        }
    },
    {
        pattern: /queryRightListForH5/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                config: {
                    total: 4,
                },
                rightsInfoList: [{
                    "id": '20180611163905170195',
                    "rightsTitle": '用卡保障服务',
                    "rightsSubTitle": '',
                    "jumpUrl": 'detail/A0001',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/0195-list.aef00000.png',
                }, {
                    "id": '20180611163905167090',
                    "rightsTitle": '机场停车礼遇',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/7090-list.a404b13e.png',
                }, {
                    "id": '20180611163905168336',
                    "rightsTitle": '环球旅行及医疗救援服务',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/8336-list.fc502347.png',
                }, {
                    "id": '20180611163905168369',
                    "rightsTitle": '赫兹Hertz租车权益',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/8369-list.e6f3add1.png',
                }, {
                    "id": '20180611163905169450',
                    "rightsTitle": '境外退税服务',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-list.124b2a56.png',
                }, {
                    "id": '20180611163905169931',
                    "rightsTitle": '万豪酒店集团尊享礼遇',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9931-list.9f309e4c.png',
                }, {
                    "id": '20180611163905168369',
                    "rightsTitle": '赫兹Hertz租车权益',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/8369-list.e6f3add1.png',
                }, {
                    "id": '20180611163905169450',
                    "rightsTitle": '境外退税服务',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-list.124b2a56.png',
                }, {
                    "id": '20180611163905169931',
                    "rightsTitle": '万豪酒店集团尊享礼遇',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9931-list.9f309e4c.png',
                }, {
                    "id": '20180611163905168369',
                    "rightsTitle": '赫兹Hertz租车权益',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/8369-list.e6f3add1.png',
                }, {
                    "id": '20180611163905169450',
                    "rightsTitle": '境外退税服务',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-list.124b2a56.png',
                }, {
                    "id": '20180611163905169931',
                    "rightsTitle": '万豪酒店集团尊享礼遇',
                    "rightsSubTitle": '',
                    "jumpUrl": '',
                    "activityPreviewImageUrl": '//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9931-list.9f309e4c.png',
                }]
            }
        }
    },
    {
        pattern: /queryRightDetailForH5/i,
        respondWith: function () {
            return {
                "result": {"resultCode": "CMN000000", "message": "成功"},
                "ResponseStatus": {
                    "Timestamp": "/Date(1562666799069+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{"Id": "CLOGGING_TRACE_ID", "Value": "2815197366250223762"}, {
                        "Id": "RootMessageId",
                        "Value": "921812-0a0f6a94-434074-406843"
                    }]
                },
                "rightsInfoPacket": {
                    "id": "20190617163905167090",
                    "rightsTitle": "笔笔立减",
                    "rightsSubTitle": "最高立减188元",
                    "activityPreviewImageUrl": "https://pages.c-ctrip.com/creditcard/MRH/qunarljqylb.png",
                    "activityImageUrl": "https://pages.c-ctrip.com/creditcard/MRH/qunarljqyxq.png",
                    "activityImageUrlForX": "https://pages.c-ctrip.com/creditcard/MRH/qunarljqyxqX.png",
                    "content": "abc",
                    "jumpUrl": ""
                },
                "userStatus": "USER000006"
            }
            //{
            //    result: {
            //        resultCode: "CMN000000"
            //    },
            //    rightsInfoPacket: {
            //        "activityImageUrl": "//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-detail-banner.28cf3a4d.png",
            //        "activityImageUrlForX": "//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-detail-banner-iphonex.aeb09211.png",
            //        "activityPreviewImageUrl": "//pic.c-ctrip.com/picaresonline/creditcard/qunar_rights_images/unionpay/9450-list.124b2a56.png",
            //        "content": '<p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">活动时间：</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">即日起至2018年12月31日</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666"><br/></span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">活动对象：</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">东亚去哪儿白金信用卡持卡人</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666"><br/></span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">活动内容：</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">银联与全球三大退税机构环球蓝联（Global Blue）、Premier Tax Free和Tax Free Worldwide合作推出银联卡（卡号以62开头）境外退税服务，覆盖38个国家地区。此外，在韩国除了环球蓝联以外，银联还和KTIS 、Global Tax Free等本地退税机构合作，都可以直接退税到银联卡。</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">在境外商店购物时，只要看到商家贴有以下合作退税机构的标示，就可以申请银联退税。</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">全球退税合作伙伴：</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><img src="http://dimg04.c-ctrip.com/images/y6020t000000inyow7C04.jpg"/></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">韩国本地退税机构：</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><img src="http://dimg04.c-ctrip.com/images/y60t0t000000igxjc98A0.jpg"/></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B"><br/></span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">银联卡退税流程</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">第一步：领取退税申请单(Tax Free Form)并填写银联卡号 </span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">如购物的商户支持以上退税机构的退税业务，向商户索取退税申请单，并按要求用英文字母填写姓名、护照号等信息，请务必在信用卡卡号区域填写您的银联卡号。如没有完整填写退税申请单，则无法获得退税款。 </span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">第二步：在海关完成盖章（Customs）</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">在办理登机手续(Check-in)前到机场的海关出示您的退税申请表、护照和所购得的商品（请随身携带未被使用过的商品以备海关人员检查）、票据等，海关在审核后，将在您填写好的退税申请单上盖章使之生效。未经海关盖章的退税单将无法完成退税。 </span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">第三步：直接投入退税邮箱 </span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">请将填写完成并盖过章的退税申请单放入对应的退税公司的退税邮箱中，在正确完成上述退税程序的情况下，银联会接收到退税机构的退税申请并及时退款到对应的发卡行，发卡行会将退款存入所填写的银联卡内。</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666"><br/></span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">银联卡退税优势</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">1. </span><span style="font-size: 14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">平均5-10个工作日到账，直接退税到银联卡</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">2. </span><span style="font-size: 14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">人民币到账、省去货币兑换的麻烦，免1-2%货币转换费和汇兑损失</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">3. </span><span style="font-size: 14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">相对现金退税，银联卡退税可避免退税机构对于现金退税的额外收费</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">4. </span><span style="font-size: 14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">相对现金退税，免去排队退税的繁琐</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">注：如使用双币卡（卡号非‘62’开头）接收退税款，将不通过银联网络且退税款将为美元、欧元等外币。</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666"><br/></span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:17px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#CEB27B">海外退税支持地区</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">银联卡境外退税服务覆盖全球38个国家和地区，30多万家商户。</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">包括主要欧洲国家（如法国、德国、意大利、英国、瑞士、西班牙）以及新加坡、韩国等。详情请查询</span></p><p style="margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">http://www.globalblue.com</span></p><p style="margin: 5px 0px;"><span style="font-size:14px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#666666">http://www. fintrax.com</span></p>',
            //        "id": "20180611163905169450",
            //        "jumpUrl": "https://billcloud.unionpay.com/upwxs-mrmpweb/right/3/detail?rightId=9",
            //        "rightsSubTitle": "",
            //        "rightsTitle": "境外退税服务"
            //    },
            //    userStatus: "USER0000013"
            //}
        }
    },
    {
        pattern: /getNineYuanActivityInfo\.json/i,
        respondWith: function () {

            // USER000001  (用户未登录)
            // USER000002  （用户已未申卡）
            // USER000003  （用户已申卡未激活）
            // ACTIVITY000000  (成功，点亮我要参加按钮)
            // ACTIVITY000001  (活动未开始)
            // ACTIVITY000002  (活动已结束)
            // CMN999999  表示系统内部错误"

            return {
                result: {
                    resultCode: "USER000003"
                },
            }
        }
    },
    {
        pattern: /getCompanyInfo\.json/i,
        respondWith: function () {
            return {
                result: {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                companyInfoList: [{
                    "code": "23",
                    "description": "政府机关",
                    "type": 1
                },
                    {
                        "code": "24",
                        "description": "旅游、宾馆",
                        "type": 1
                    },
                    {
                        "code": "25",
                        "description": "能源及通信",
                        "type": 1
                    },
                    {
                        "code": "26",
                        "description": "公共事业",
                        "type": 1
                    }

                    , {
                        "code": "23",
                        "description": "部门-制造部23",
                        "type": 11,
                        "parentcode": "23"
                    },
                    {
                        "code": "24",
                        "description": "部门-仓储部23",
                        "type": 11,
                        "parentcode": "23"
                    },
                    {
                        "code": "25",
                        "description": "部门-其他部门25",
                        "type": 11,
                        "parentcode": "25"
                    }
                ]
            }

        }
    },
    {
        pattern: /getCommonPassengerPersonalInfo\.json/i,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1511506786537+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "6636936833012926818"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022627-419862-136314"
                        },
                        {
                            "Id": "auth",
                            "Value": "A6DB40911460039EBF1DCFE0CDE8673211EA1A081B1D482BF59C6EF5D08E16CB"
                        }
                    ]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "commonPassengerPersonalInfoList": [{
                    "isSelf": 1,
                    "cnName": "测试三",
                    "enFirstName": "DEHUAA ",
                    "enLastName": "LIU",
                    "idType": "01",
                    "idNo": "362202198408035957",
                    "email": "test@ctrip.com",
                    "phoneNumber": "13312340000",
                    "idValidDate": ""
                },
                    {
                        "isSelf": 0,
                        "cnName": "何老呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试安",
                        "enFirstName": "SHIAN ",
                        "enLastName": "CHEN",
                        "idType": "01",
                        "idNo": "362202198408035957",
                        "email": "",
                        "phoneNumber": "15000013664",
                        "idValidDate": "9999-12-31"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿童",
                        "enFirstName": "TONG ",
                        "enLastName": "ER",
                        "email": "",
                        "phoneNumber": "13600000000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试安",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "362202198408035957",
                        "email": "",
                        "phoneNumber": "15000013664",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试二",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "362202198408015956",
                        "email": "",
                        "phoneNumber": "13312340000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "三岁",
                        "enFirstName": "SUI ",
                        "enLastName": "SAN",
                        "email": "wmou@ctrip.com",
                        "phoneNumber": "13641927013"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试一",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试",
                        "enFirstName": "SHI ",
                        "enLastName": "CE",
                        "idType": "01",
                        "idNo": "362202198408015956",
                        "email": "",
                        "phoneNumber": "13707533333",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "方面面",
                        "enFirstName": "MIANMIAN ",
                        "enLastName": "FANG",
                        "email": "",
                        "phoneNumber": "13817067478"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110200198710016991",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "2017-11-13"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试二",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试已",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "啊a",
                        "enFirstName": "EWRWRR ",
                        "enLastName": "SDF",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试安",
                        "enFirstName": "CE ",
                        "enLastName": "SHIAN",
                        "idType": "01",
                        "idNo": "320681199206273028",
                        "email": "",
                        "phoneNumber": "15000013664",
                        "idValidDate": "2030-11-20"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试二",
                        "enFirstName": "DEHUA ",
                        "enLastName": "LIU",
                        "idType": "01",
                        "idNo": "362202198408015956",
                        "email": "test@ctrip.com",
                        "phoneNumber": "13312340000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿童",
                        "enFirstName": "TONG ",
                        "enLastName": "ER",
                        "idType": "01",
                        "idNo": "510304200707025825",
                        "email": "",
                        "phoneNumber": "13522220000",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试一",
                        "enFirstName": "dehua ",
                        "enLastName": "liu",
                        "email": "test@ctrip.com",
                        "phoneNumber": "13312340000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试安",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "320681199206273028",
                        "email": "",
                        "phoneNumber": "15000013664",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "低调点",
                        "enFirstName": "DIAODIAN ",
                        "enLastName": "DI",
                        "email": "",
                        "phoneNumber": "15021361887"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "李超",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "18500432234"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "常旅一",
                        "enFirstName": "dehua ",
                        "enLastName": "liu",
                        "email": "test@ctrip.com",
                        "phoneNumber": "13312340000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "比赛",
                        "enFirstName": "DDDE ",
                        "enLastName": "CCAA",
                        "idType": "01",
                        "idNo": "130406199908086255",
                        "email": "",
                        "phoneNumber": "18898566223",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人一",
                        "enFirstName": "YI ",
                        "enLastName": "LIU",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "第一个",
                        "enFirstName": "YIGENAME ",
                        "enLastName": "DIFIRST",
                        "email": "",
                        "phoneNumber": "13333333333"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "婴儿",
                        "enFirstName": "HHH ",
                        "enLastName": "HH",
                        "email": "",
                        "phoneNumber": "13522225555"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "LI/SI",
                        "enFirstName": "SI ",
                        "enLastName": "LI",
                        "email": "",
                        "phoneNumber": "18822266356"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "电风扇",
                        "enFirstName": "TASD ",
                        "enLastName": "ADEG",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "张一",
                        "enFirstName": "YIFENG ",
                        "enLastName": "LI",
                        "idType": "01",
                        "idNo": "411082199109275001",
                        "email": "",
                        "phoneNumber": "13888888887",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "荷花",
                        "enFirstName": "HUA ",
                        "enLastName": "HE",
                        "email": "wmou@ctrip.com",
                        "phoneNumber": "13000000000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "等多久",
                        "enFirstName": "EDED ",
                        "enLastName": "TSXC",
                        "email": "",
                        "phoneNumber": "13649464649"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "大幅度",
                        "enFirstName": "cc ",
                        "enLastName": "ceshi",
                        "email": "",
                        "phoneNumber": "13800138000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "张亮",
                        "enFirstName": "LIANG ",
                        "enLastName": "ZHANG",
                        "email": "",
                        "phoneNumber": "15041236082"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "姓名",
                        "enFirstName": "WANG ",
                        "enLastName": "WILL",
                        "idType": "01",
                        "idNo": "110228198801012183",
                        "email": "",
                        "phoneNumber": "13000000000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "你好",
                        "enFirstName": "EDGD ",
                        "enLastName": "CAS",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "邯郸",
                        "enFirstName": "QI ",
                        "enLastName": "PU",
                        "email": "",
                        "phoneNumber": "18822266356"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": "WANG ",
                        "enLastName": "WILL",
                        "email": "",
                        "phoneNumber": "13800138000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人一",
                        "enFirstName": "FGHFGH ",
                        "enLastName": "UYU",
                        "idType": "01",
                        "idNo": "210101199304019571",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人一",
                        "enFirstName": "FGHFGH ",
                        "enLastName": "UYU",
                        "idType": "01",
                        "idNo": "110228198801011121",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "额外",
                        "enFirstName": "AA ",
                        "enLastName": "CESHI",
                        "email": "",
                        "phoneNumber": "13800138000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试",
                        "enFirstName": "txtxtx ",
                        "enLastName": "txtxx",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试",
                        "enFirstName": "DONG ",
                        "enLastName": "HAN",
                        "email": "",
                        "phoneNumber": "13817067475"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "姓名",
                        "enFirstName": "FGHFGH ",
                        "enLastName": "UYU",
                        "idType": "01",
                        "idNo": "340202195510232018",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "哈哈是",
                        "enFirstName": "MEN ",
                        "enLastName": "AO",
                        "idType": "01",
                        "idNo": "34020219922044444444",
                        "email": "",
                        "phoneNumber": "13888888887",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文姓名",
                        "enFirstName": "WENXINGMING ",
                        "enLastName": "ZHONG",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "12",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "1",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "李明",
                        "enFirstName": "MING ",
                        "enLastName": "LI",
                        "email": "",
                        "phoneNumber": "18888880888"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试四",
                        "enFirstName": "DDD ",
                        "enLastName": "GDG",
                        "idType": "01",
                        "idNo": "350182199404133530",
                        "email": "",
                        "phoneNumber": "13865652521",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "4",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "3",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "2",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "2",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文姓名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "方天天",
                        "enFirstName": "TIANTIAN ",
                        "enLastName": "FANG",
                        "email": "",
                        "phoneNumber": "13817067475"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "测试",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110102199901012653",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文姓名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801011383",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801011383",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "特殊",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "刘2",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "刘1",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "张AB",
                        "enFirstName": "AB ",
                        "enLastName": "AB",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "小李",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110200198710016991",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110200198710016991",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110200198710016991",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "陈老师",
                        "enFirstName": "LAOSHI ",
                        "enLastName": "CHEN",
                        "email": "",
                        "phoneNumber": "13817067475"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "李鸣",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "比赛",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "130406199908086255",
                        "email": "",
                        "phoneNumber": "18898566223",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成一",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "210101199304017154",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿一",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "210101199304017154",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人一",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110101198010014056",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "13800138000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "中文名",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "310112198611016918",
                        "email": "",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "李明买买买",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "防御",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "食发鬼",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "15808080609"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿童一",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "张二",
                        "enFirstName": "CHE ",
                        "enLastName": "LI",
                        "email": "",
                        "phoneNumber": "13000000000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "陈巧玲",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "141121192502270093",
                        "email": "",
                        "phoneNumber": "13888888887",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿童二",
                        "enFirstName": "TONGER ",
                        "enLastName": "ER",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "13800000000",
                        "idValidDate": "2018-06-07"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "杨伟华",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "140424198506051172",
                        "email": "",
                        "phoneNumber": "15921960000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "李思",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "张小白",
                        "enFirstName": "zhangxiao bai",
                        "enLastName": "zhangxiao",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "陈巧玲",
                        "enFirstName": "SAN ",
                        "enLastName": "ZHANG",
                        "idType": "01",
                        "idNo": "442826196912010091",
                        "email": "",
                        "phoneNumber": "13333333333",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "方小天",
                        "enFirstName": "XIAOTIAN ",
                        "enLastName": "FANG",
                        "idType": "01",
                        "idNo": "511002197103093912",
                        "email": "",
                        "phoneNumber": "13817067475",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "孙珍妮",
                        "enFirstName": "ZHENNI ",
                        "enLastName": "SUN",
                        "email": "",
                        "phoneNumber": "13871664875"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "吴恩达",
                        "enFirstName": "ENDA ",
                        "enLastName": "WU",
                        "email": "",
                        "phoneNumber": "13817067475"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "常旅yi",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "儿童",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "13522220000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "陈镜羽",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "52242219910326002X",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "十多个",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人二",
                        "enFirstName": "REN ",
                        "enLastName": "CHENG",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "成人三",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "110228198801010284",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": "1900-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "陈镜羽",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "52242219910326002X",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "13800000000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "ceshi",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "610602198804127556",
                        "email": "asd@cc.cc",
                        "phoneNumber": "13800138000",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "啥啥啥",
                        "enFirstName": "SSS ",
                        "enLastName": "SHASS",
                        "idType": "01",
                        "idNo": "210101199304019811",
                        "email": "",
                        "phoneNumber": "13555555555",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "迭戈",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "第二个",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "IDCARD1",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "出发点",
                        "enFirstName": " ",
                        "enLastName": "",
                        "idType": "01",
                        "idNo": "447896199812202325",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "煞风景",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "试试",
                        "enFirstName": "FD ",
                        "enLastName": "FD",
                        "idType": "01",
                        "idNo": "330282198808010032",
                        "email": "",
                        "phoneNumber": "15921789976",
                        "idValidDate": "3939-01-01"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "来来来",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "试试是",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "明明",
                        "enFirstName": "ming ",
                        "enLastName": "ming",
                        "idType": "01",
                        "idNo": "320282200010101313",
                        "email": "",
                        "phoneNumber": "13344443333",
                        "idValidDate": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "戴混",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": ""
                    },
                    {
                        "isSelf": 0,
                        "cnName": "何呵呵",
                        "enFirstName": " ",
                        "enLastName": "",
                        "email": "",
                        "phoneNumber": "13800000000"
                    },
                    {
                        "isSelf": 0,
                        "cnName": "贺信",
                        "enFirstName": "a ",
                        "enLastName": "HE",
                        "idType": "01",
                        "idNo": "321383199010111234",
                        "email": "",
                        "phoneNumber": "",
                        "idValidDate": ""
                    }
                ]
            }
        }
    },
    {
        pattern: /getOrderInfo\.json/i,
        respondWith: function () {
            return {
                // empFlag: 1,
                orderDetailInfo: {
                    orderBase: {
                        captcha: "233333",
                        cname: "实名认证",
                        email: "test@ctrip.com",
                        enameF: "SHI MING",
                        enameL: "REN ZHENG",
                        idNo: "341621199001053716",
                        idOrg: "268001",
                        orgText: "西藏/樟木口岸镇/扎达县",
                        idValidThru: "20170306",
                        mobilephone: "13621715759",
                        orderId: 12,
                        empFlag: "2",
                    },
                    areaCodeH: "1",
                    areaTextH: "闵行区",
                    addressH: "宁虹路",
                    areaCodeO: "2",
                    areaTextO: "长宁区",
                    addressO: "金钟路965",
                    deliverAdd: 1, //(0:家庭地址;1;工作地址)
                    coName: "携程",
                    coTel: "021-99999-556",
                    coTrade: "金融业-其他",
                    coTradeCode: "A7",
                    coProperty: "上市公司",
                    coPropertyCode: "A5",
                    title: "一般员工",
                    titleCode: "A4",
                    income: "2000-4000",
                    incomeCode: "1",
                    cotactCName: "姚强",
                    contactMobile: "13621715758",
                    relation: "朋友",
                    relationCode: "6",
                    seniority: 4,
                    maritalStatus: "未婚",
                    maritalStatusCode: "1",
                    educationLevel: "大学本科",
                    educationLevelCode: "4"
                },
                result: {
                    resultCode: "CMN000000"
                }
            }
        }
    },
    {
        pattern: /getHomePageConfig\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                floors: [ // 要求排序
                    {
                        floorName: "高额权益，开卡即享",
                        floorType: 1, // 楼层类型（特色楼层0，普通楼层1）
                        floorStyle: 0, // 楼层样式（纯文字0，纯图片1，图文混配2，奇偶混排3）
                        isShowMore: false, // <Boolean>
                        showMoreUrl: "https://m.ctrip.com/webapp/cc/yoyo", // <String>
                        textMore: "", // <String> 默认“更多”
                        floorDetails: [{
                            isVertical: false, // <Booean>
                            textDescribe: "任意刷1笔免首年年费",
                        },
                            {
                                isVertical: false, // <Booean>
                                textDescribe: "72小时失卡保障服务",
                            },
                            {
                                isVertical: false, // <Booean>
                                textDescribe: "五星酒店自助餐买一赠一",
                            },
                            {
                                isVertical: false, // <Booean>
                                textDescribe: "凯悦餐厅珍馐美食8.8折",
                            },
                            {
                                isVertical: false, // <Booean>
                                textDescribe: "1元尊享全国机场停车",
                            },
                            {
                                isVertical: false, // <Booean>
                                textDescribe: "1600万元高额航空意外险",
                            }
                        ]
                    },
                    {
                        floorName: "",
                        floorType: 1, // 楼层类型（特色楼层0，普通楼层1）
                        floorStyle: 1, // 楼层样式（纯文字0，纯图片1，图文混配2，奇偶混排3）
                        isShowMore: false, // <Boolean>
                        showMoreUrl: "https://m.ctrip.com/webapp/cc/yoyo", // <String>
                        textMore: "", // <String> 默认“更多”
                        floorDetails: [{
                            isVertical: false, // <Booean>
                            imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/hp_airticket.cf91ff26.jpg",
                            jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/33"
                        },
                            {
                                isVertical: false, // <Booean>
                                imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/hp_daisen.cd8d8eff.jpg",
                                jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/34"
                            }
                        ]
                    },
                    {
                        floorName: "",
                        floorType: 1, // 楼层类型（特色楼层0，普通楼层1）
                        floorStyle: 3, // 楼层样式（纯文字0，纯图片1，图文混配2，奇偶混排3）
                        isShowMore: true, // <Boolean>
                        showMoreUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard", // <String>
                        textMore: "哟哟，这里有更多权益", // <String> 默认“更多”
                        floorDetails: [{
                            isVertical: true, // <Booean>
                            imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/homepage_exchange.048ee8d9.jpg",
                            jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/3"
                        },
                            {
                                isVertical: false, // <Booean>
                                imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/hp_daisen.cd8d8eff.jpg",
                                jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/3"
                            },
                            {
                                isVertical: false, // <Booean>
                                imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/hp_airticket.cf91ff26.jpg",
                                jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/3"
                            },
                            {
                                isVertical: false, // <Booean>
                                imageUrl: "https://pic.c-ctrip.com/picaresonline/creditcard/pic/h5/images/hp_daisen.cd8d8eff.jpg",
                                jumpUrl: "https://m.fat613.qa.nt.ctripcorp.com/webapp/myrights/creditcard/detail/3"
                            }
                        ]
                    }
                ]
            }
        }
    },


    {
        pattern: /overlayConfirm\.json/i,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                /**
                 USER000001：未申卡；USER000002：申卡中（未提交）；USER000003：审核中；USER000004：审核通过；USER000005：审核不通过
                 */
                status: "USER000002",
                orderId: 2252420107,
                orderType: 3
            }
        }
    },

    {
        pattern: /validCwalletUserByH5/i,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1509675976451+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "955124102291550273"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022628-419354-19949"
                        },
                        {
                            "Id": "auth",
                            "Value": "A6DB40911460039EBF1DCFE0CDE867329C1D717C81EED570999AE6E0915853AA"
                        }
                    ]
                },
                // "header":{
                //     "code":1035,
                //     "msg":"机票plus会员信息匹配失败"
                // },
                "header": {
                    "code": 1000,
                    "msg": "mock成功状态"
                },
                "errMsgList": [{
                    "name": "RealName",
                    "value": "Fail"
                }]
            }
        }
    },
    {
        pattern: /GetLoginStatusByTicket\.json/i,
        respondWith: function () {
            return {
                "ReturnCode": 0,
                "Message": "成功",
                "IsLogin": "T",
                "IsNonUser": "F",
                "ExtendProperty": [],
                "ResponseStatus": {
                    "Timestamp": "/Date(1509674218424+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "6046703923978051695"
                    },
                        {
                            "Id": "auth",
                            "Value": "A6DB40911460039EBF1DCFE0CDE867329C1D717C81EED570999AE6E0915853AA"
                        }
                    ]
                }
            }
        }
    },
    {
        pattern: /getOrderId\.json/,
        respondWith: function () {
            return {
                result: {

                    resultCode: "CMN000000" //
                    // resultCode: "PORTAL000090" //白名单被拒
                    // resultCode: "PORTAL000006" // PORTAL000006 风控失败， CMN000000 成功
                    // resultCode: "PORTAL000090"  ,
                    // message: "不在信用卡系统白名单中",
                },
                orderId: 111
            }
        }
    },
    {
        pattern: /GetClientVersion\.json/,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1519711078230+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "7585360506405863223"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022627-422141-128064"
                        }
                    ]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "clientVersion": "b"
            }
        }
    },
    {
        pattern: /getIssuedOrgByIDCardNo\.json/,
        respondWith: function () {
            return {
                "ResponseStatus": {
                    "Timestamp": "/Date(1519437198548+0800)/",
                    "Ack": "Success",
                    "Errors": [],
                    "Extension": [{
                        "Id": "CLOGGING_TRACE_ID",
                        "Value": "3504900748940413031"
                    },
                        {
                            "Id": "RootMessageId",
                            "Value": "921812-0a022628-422065-47126"
                        }
                    ]
                },
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "issuedOrg": {
                    "orgId": 2900,
                    "orgName": "上海市"
                }
            }
        }
    },
    {
        pattern: /getDistrictCode\.json/,
        respondWith: function () {
            return {
                areaCode: 200,
                result: {

                    resultCode: "CMN000000" //
                    // resultCode: "PORTAL000090" //白名单被拒
                    // resultCode: "PORTAL000006" // PORTAL000006 风控失败， CMN000000 成功
                },
            }
        }
    },
    {
        pattern: /getAreaInfo\.json/,
        respondWith: function () {
            return {
                "result": {
                    "resultCode": "CMN000000",
                    // "resultCode": "CMN000002",
                    "message": "成功"
                },
                "areaInfoList": [{
                    "addressLevel": 2,
                    "addressID": 1,
                    "addressName": "北京"
                },
                    {
                        "addressLevel": 2,
                        "addressID": 2,
                        "addressName": "上海"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 3,
                        "addressName": "天津"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 4,
                        "addressName": "重庆"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 5,
                        "addressName": "黑龙江"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 6,
                        "addressName": "吉林"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 7,
                        "addressName": "辽宁"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 8,
                        "addressName": "河北"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 9,
                        "addressName": "河南"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 10,
                        "addressName": "山东"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 11,
                        "addressName": "山西"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 12,
                        "addressName": "陕西"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 13,
                        "addressName": "甘肃"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 14,
                        "addressName": "宁夏"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 15,
                        "addressName": "江苏"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 16,
                        "addressName": "浙江"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 17,
                        "addressName": "安徽"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 18,
                        "addressName": "江西"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 19,
                        "addressName": "福建"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 20,
                        "addressName": "湖北"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 21,
                        "addressName": "湖南"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 22,
                        "addressName": "四川"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 23,
                        "addressName": "广东"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 24,
                        "addressName": "广西"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 25,
                        "addressName": "云南"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 26,
                        "addressName": "贵州"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 27,
                        "addressName": "青海"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 28,
                        "addressName": "内蒙古"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 29,
                        "addressName": "新疆"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 30,
                        "addressName": "西藏"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 31,
                        "addressName": "海南"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 32,
                        "addressName": "香港"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 33,
                        "addressName": "澳门"
                    },
                    {
                        "addressLevel": 2,
                        "addressID": 53,
                        "addressName": "台湾"
                    }
                ]
            }
        }
    },
    {
        pattern: /verifyInvitationCode\.json/,
        respondWith: function () {
            return {
                "result": {
                    "resultCode": "CMN000000"
                    // "resultCode": "PORTAL000054"
                }
            }
        }
    },
    {
        pattern: /overlayLeave\.json/,
        respondWith: function () {
            return {
                "result": {
                    "resultCode": "CMN000000"
                    // "resultCode": "PORTAL000054"
                }
            }
        }
    },
    {
        pattern: /getNotWhiteListInfo\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "PORTALGNWL0001"
                },
                appointmentDto: {
                    uid: "34",
                    name: "户籍科或具扩",
                    mobilePhone: "15021450473"
                }
            }
        }
    }, {
        pattern: /setNotWhiteListInfo\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                }
            }
        }
    }, {
        pattern: /queryTeleCustServices\.json/,
        respondWith: function () {
            return {
                resultCode: "CMN000000",
                CustServices: ["aa", "bb"]
            }
        }
    }, {
        pattern: /getCashbackHistory\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                pageInfo: {pageIndex: 1, pageSize: 10, pageCount: 14},
                cashbackTotal: "666.66",
                cashbackInfoList: [{
                    sourceId: "0002",
                    merchantName: "想哭",
                    orderId: "000021",
                    actName: "携程酒店限时20%返现",
                    actId: "222222222",
                    consumeAmount: "388.88",
                    consumeCurrency: "CNY",
                    cashbackAmount: "66.00",
                    cashbackCurrency: "CNY",
                    cashbackStatus: "待返现",
                    cashbackDate: "2017-04-10"
                },
                    {
                        sourceId: "0001",
                        merchantName: "上海-北京 单程机票",
                        orderId: "106561235",
                        actName: "携程机票返现",
                        actId: "222222222",
                        consumeAmount: "4,500.00",
                        consumeCurrency: "CNY",
                        cashbackAmount: "500.00",
                        cashbackCurrency: "CNY",
                        cashbackStatus: "已取消",
                        cashbackDate: "2017-12-10"
                    }
                ]
            }
        }
    }, {
        pattern: /getCardQueryAuth\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "PORTALSCQA0002"
                },
                applyCardReserveDto: {
                    name: "的的",
                    mobilePhone: "15021450473",
                    provinceName: "上海",
                    cityName: "上海"
                }
            }
        }
    }, {
        pattern: /getApplyCardReserveStatus\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "PORTALGNWL0001"
                },
                applyCardReserveDto: {
                    name: "的的",
                    mobilePhone: "15021450473",
                    provinceName: "上海",
                    cityName: "上海"
                }
            }
        }
    }, {
        pattern: /applyOrderRouter\.json/,
        respondWith: function () {
            return {
                "result": {
                    "resultCode": "CMN000000",
                    "message": "成功"
                },
                "bankType": "bea"
            }
        }
    },
    {
        pattern: /setApplyCardReserveStatus\.json/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                applyCardReserveDto: {
                    name: "的的",
                    mobilePhone: "15021450473",
                    provinceName: "上海",
                    cityName: "上海"
                }
            }
        }
    },
    {
        pattern: /queryUserRightsForH5/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                userRightsList: [{
                    rightsNo: 'A0001',
                    couponNo: 'C0001',
                    couponStatus: 1,
                },
                    {
                        rightsNo: 'A0002',
                        couponNo: 'C0002',
                        couponStatus: 1,
                    }, {
                        rightsNo: 'A0002',
                        couponNo: 'C0003',
                        couponStatus: 1,
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0005',
                        couponStatus: 1,
                        couponMonth: "201803"
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0009',
                        couponStatus: 2,
                        couponMonth: "201804"
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0010',
                        couponStatus: 9,
                        couponMonth: "201805"
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0011',
                        couponStatus: 1,
                        couponMonth: "201806"
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0012',
                        couponStatus: 9,
                        couponMonth: "201807"
                    },
                    {
                        rightsNo: 'A0004',
                        couponNo: 'C0013',
                        couponStatus: 9,
                        couponMonth: "201808"
                    },
                    {
                        rightsNo: 'A0005',
                        couponNo: 'C0006',
                        couponStatus: 0,

                    }, {
                        rightsNo: 'A0005',
                        couponNo: 'C0007',
                        couponStatus: 1,

                    }, {
                        rightsNo: 'A0005',
                        couponNo: 'C0008',
                        couponStatus: 1,
                    }, {
                        rightsNo: 'A0007',
                        couponNo: 'C0020',
                        couponStatus: 5,
                    }
                ],
                serverTime: "2018-03-08 16:02",
                orderId: "123", //申卡订单号
                // 用户持卡状态:
                //userStatus: 'USER000001' //用户未登录
                // userStatus: 'USER000002' //用户未申卡 0
                // userStatus: 'USER000003' //用户申卡审核中 1
                // userStatus: 'USER000004' //用户已核卡 2
                // userStatus: 'USER000005' //用户核卡失败 3
                //userStatus: 'USER000006', //用户已激活 4
                // userStatus: 'USER0000012' // 未首刷
                userStatus: 'USER0000013' // 已注销

                //优惠券状态 0可以购买  1 已经购买  2 已过期  3 已消费 4 未达标

            }
        }
    },
    {
        pattern: /userReceiveRightsForH5/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                orderId: "", //申卡订单号
                // 用户持卡状态:
                // userStatus: 'USER000001' //用户未登录
                // userStatus: 'USER000002' //用户未申卡 0
                // userStatus: 'USER000003' //用户申卡审核中 1
                // userStatus: 'USER000004' //用户已核卡 2
                // userStatus: 'USER000005' //用户核卡失败 3
                // userStatus: 'USER000006' //用户已激活 4
                // userStatus: 'USER000007' //用户权益不存在
                // userStatus: 'USER000008' //用户权益已经领取
                // userStatus: 'USER000009' //用户领取时间过期
                userStatus: 'USER0000010' //用户权益领取成功
                // userStatus: 'USER0000011' //用户权益领取失败
            }
        }
    },
    {
        pattern: /receiveProductCoupon/,
        respondWith: function () {
            return {
                result: {
                    resultCode: "CMN000000"
                },
                orderId: "", //申卡订单号
                // 用户持卡状态:
                // userStatus: 'USER000001' //用户未登录
                // userStatus: 'USER000002' //用户未申卡 0
                // userStatus: 'USER000003' //用户申卡审核中 1
                // userStatus: 'USER000004' //用户已核卡 2
                // userStatus: 'USER000005' //用户核卡失败 3
                // userStatus: 'USER000006' //用户已激活 4
                // userStatus: 'USER000007' //用户权益不存在
                // userStatus: 'USER000008' //用户权益已经领取
                // userStatus: 'USER000009' //用户领取时间过期
                userStatus: 'USER0000010' //用户权益领取成功
                // userStatus: 'USER0000011' //用户权益领取失败
            }
        }
    },
    {
        pattern: /Material\/GetMaterial/,
        respondWith: function () {
            return {
                "success": true,
                "errorCode": 0,
                "errorMessage": "",
                "content": {
                    "materialContents": [{
                        "materialid": 1,
                        "mediaid": "P-Gp6UKUwr-HZqoewZIl_2cTqG3POxhIEq6or4WmM1uGhnN02UNse1sWWFGnHH8r",
                        "appid": "wxc2ef44be25c25714",
                        "fileType": "image",
                        "fileName": "image2017-8-7 17_11_58.png",
                        "datachangeLastuser": "test",
                        "datachangeCreatetime": null,
                        "datachangeLasttime": "2018-12-25 13:45:21"
                    }],
                    "count": 1
                }
            }

        }
    }

])
module.exports = moduleExports;
