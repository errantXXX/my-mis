module.exports = {
  'http://qatest.api.ofo.com/ofo-kefu-api/coupon/buyList': {
  "code": 200,
  "msg": "查询成功",
  "data": {
    "info": {
      "page": 0,
      "size": 10,
      "totalSize": 3,
      "list": [
        {
          "tradeNo": "23232",
          "thirdTradeNo": "3232323323",
          "name": "叶兵",
          "mobile": "13517228905",
          "tradeTime": "2017-01-01 00:00:00",
          "money": 20,
          "payChannel": "支付宝",
          "payStatus": 1,
          "payStatusDes": "充值成功",
          "refundStatus": 1,
          "refundStatusDes": "无退款"
        }
      ]
    }
  }
},
  'http://qatest.api.ofo.com/ofo-kefu-api/coupon/buyDetail': {
  "code": 200,
  "msg": "操作成功",
  "data": {
    "info": {
      "userInfo": {
        "name": "叶兵",
        "mobile": "13517228905",
        "userId": 91274883,
        "oauth": "未认证",
        "cityName": "北京市"
      },
      "orderInfo": {
        "orderNo": "DU89085595908846211",
        "orderStatus": 1,
        "orderStatusDes": "已到账",
        "couponType": "1",
        "couponTypeDes": "月卡",
        "orderFrom": "android-APP"
      },
      "payInfo": {
        "payChannel": "支付宝",
        "payMoney": "0.20",
        "payStatus": 1,
        "payStatusDes": "支付成功",
        "payComment": "超时未支付",
        "payTime": "2017-12-25 19:54:21",
        "paySuccTime": "2017-12-25 19:54:30",
        "payTradeNo": "DU89085595908846211",
        "payThirdTradeNo": "2017122521001004810285177639",
        "payType": "1",
        "payTypeDes": "在线支付",
        "payFromAccount": "850***@qq.com",
        "payToAccount": "支付宝wanggeng",
        "couldPayRepair": false,
        "couldRefund": false,
        "cardSurplusRight":{
          "payMoney" :30,
          "cardSumDay" :20,
          "cardSurplusDay" :10,
          "partRefundMoney" :20
        }
      },
      "refundInfo": {
        "refundChannel": "支付宝",
        "refundMoney": 0.2,
        "refundStatus": 1,
        "refundStatusDes": "退款成功",
        "refundComment": "审核通过，退款成功",
        "refundTime": "2017-12-26 10:24:29",
        "refundSuccTime": "2017-12-26 10:24:29",
        "refundTradeNo": "W2017122610242936512393",
        "refundThirdTradeNo": "2017122521001004810285177639",
        "refundToAccount": "",
        "refundToName": "",
        "refundType": 1,
        "refundTypeDes": "原路退回",
        "refundReason": "",
        "couldRefundRepair": false,
        "couldAppendRefund": false
      },
      "couponInfo": {
        "couponName": "携程合作卡",
        "couponStatus": 1,
        "couponStatusDes": "生效中",
        "effectBeginTime": "2018-01-01 00:00:00",
        "effectEndTime": "2018-01-01 23:59:59",
        "channel": "支付宝"
      }
    }
  }
},

	'/ofo-kefu-api/assistant/push/list': {
		  "code": 200,
		  "msg": "操作成功",

		  "data": {
			"page": 1,
		    "size": 5,
		    "totalSize": 5,
		    "list":[
			    {
			      "title": "退款请注意",
			      "url": "http://www.baidu.com",
			      "pushType": 1,
			      "pushTypeDes": "公告",
			      "createOpper": "龙存",
			      "createTime": "2018-01-01 00:00:00",
			      "auditOpper": "龙存2",
			      "pushTime": "2018-01-01 00:00:00",
			      "pushStatus": 1,
			      "pushStatusDes": "待提交",
			      "pushId": 2
			    },
			    {
			      "title": "退款请注意",
			      "url": "http://www.baidu.com",
			      "pushType": 1,
			      "pushTypeDes": "公告",
			      "createOpper": "龙存",
			      "createTime": "2018-01-01 00:00:00",
			      "auditOpper": "龙存2",
			      "pushTime": "2018-01-01 00:00:00",
			      "pushStatus": 2,
			      "pushStatusDes": "待审核",
			      "pushId": 2
			    },
			    {
			      "title": "退款请注意",
			      "url": "http://www.baidu.com",
			      "pushType": 1,
			      "pushTypeDes": "公告",
			      "createOpper": "龙存",
			      "createTime": "2018-01-01 00:00:00",
			      "auditOpper": "龙存2",
			      "pushTime": "2018-01-01 00:00:00",
			      "pushStatus": 3,
			      "pushStatusDes": "待发送",
			      "pushId": 2
			    },
			    {
			      "title": "退款请注意",
			      "url": "http://www.baidu.com",
			      "pushType": 1,
			      "pushTypeDes": "公告",
			      "createOpper": "龙存",
			      "createTime": "2018-01-01 00:00:00",
			      "auditOpper": "龙存2",
			      "pushTime": "2018-01-01 00:00:00",
			      "pushStatus": 4,
			      "pushStatusDes": "已推送",
			      "pushId": 2
			   	},
			    {
			      "title": "退款请注意",
			      "url": "http://www.baidu.com",
			      "pushType": 1,
			      "pushTypeDes": "公告",
			      "createOpper": "龙存",
			      "createTime": "2018-01-01 00:00:00",
			      "auditOpper": "龙存2",
			      "pushTime": "2018-01-01 00:00:00",
			      "pushStatus": 5,
			      "pushStatusDes": "审核驳回",
			      "pushId": 2
			    }

		    ]
		}
	},
	'/ofo-kefu-api/assistant/push/detail' : {
	  "code": 200,
	  "msg": "操作成功",
	  "data": {
	  	"pushType": "2",
	  	"fileUrl": "http://baidu.com",
	  	"fileLineCount": 3000,
	  	"fileName": "北京市用户",
	  	"title": "ddd",
	  	"url": "http://www.ofo.com",
	  	"content": "北京市用户你们都有福了",
	  	"pushTime": "2018-01-01 09:00:00",
	  	"auditList": [
	  		{
	  			"auditOpper": "测试用户",
	  			"auditTime": "2018-01-01 09:00:00",
	  			"auditStatus": "通过",
	  			"auditStatusDes": "审核结果描述文字",
	  			"auditComment": "完美"
 	  		},
 	  		{
	  			"auditOpper": "测试用户",
	  			"auditTime": "2018-01-01 09:00:00",
	  			"auditStatus": "通过",
	  			"auditStatusDes": "审核结果描述文字",
	  			"auditComment": "完美"
 	  		},	  		

	  	]
	  }
	},
	'/ofo-kefu-api/assistant/push/new' : {
	  "code": 200,
	  "msg": "操作成功",
	  "data": {
	    "pushId": 12
	  }
	}
}
