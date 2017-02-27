define({ "api": [
  {
    "type": "post",
    "url": "/create_activate_member",
    "title": "",
    "name": "create_activate_member",
    "group": "PayMent",
    "description": "<p>create_activate_member api.创建激活会员接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"提交成功\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-create_activate_member-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"用户标识信息重复\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/create_hosting_deposit",
    "title": "",
    "name": "create_hosting_deposit",
    "group": "PayMent",
    "description": "<p>create_hosting_deposit api.充值接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>充值金额</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pay_method",
            "description": "<p>支付方式(online_bank)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_code",
            "description": "<p>银行编号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "public_flag",
            "description": "<p>对公或者对私</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "debit",
            "description": "<p>信用卡还是借记卡</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_account_no",
            "description": "<p>银行卡卡号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"sign\":\"jmI7QgD+TYIal5x0xcPgYLQD6CTlqIOIOlht8WHvDoxovOdVOP7WrWWT0JghnRR8/BbbgIuYPBsdig7i+PHKk+AcxtPbH/RG+p7LVjh+6qiLPz+nwud4jTLZBWDV9/kY6rznNejjw0ExG9gvXakbgF2NDz3tXCdmMwb2WA7FZJs=\",\"redirect_url\":\"https://test.pay.sina.com.cn/cashdesk-web/view/recharge.html?ft=72599169-5827-4cc7-a02c-9160c6adc32c\",\"sign_version\":\"1.0\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"response_time\":\"20170227132415\",\"response_message\":\"提交成功\",\"deposit_status\":\"PROCESSING\",\"sign_type\":\"RSA\",\"response_code\":\"APPLY_SUCCESS\",\"out_trade_no\":\"201702271324191202\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-create_hosting_deposit-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"sign\":\"II4PY0ui3X4e8WgE/N0o/IdDKgVOVxAnDdVGqmFfnaS0yv/KzOQaett42z7L29GPiVATWEAZyzh3w0heD25nv7Evw+ZukaQ/hDgdIRFrocgDxeTWrtsuxcprw/MsJtXmWY0diu/T8UTWUI4Y1CRZ+uP6RN+45TaqFf+AJRCVjFQ=\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"response_time\":\"20170225131705\",\"response_message\":\"支付方式格式错误!\",\"sign_type\":\"RSA\",\"response_code\":\"ILLEGAL_ARGUMENT\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/find_pay_password",
    "title": "",
    "name": "find_pay_password",
    "group": "PayMent",
    "description": "<p>find_pay_password api.找回支付密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170224145229\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"redirect_url\":\"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-find_pay_password-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170224151557\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"CMV3DZ34XYC3mxpDiQiVN2XD9x7iv/ogTNBvA9OS4WcMZekPMu9lL+5ydsy4Ly/vTvCUwVgUCwZ0K9B0rtlp4rAa3/i6QCgM4JaK3I5i7/W4TbHQPgJrz2qXLo13nLYmYRzvzCTe0PBUOjv+VQBjwyuKCoTQwyML3YHdVBHdrg0=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"抱歉！会员状态未激活，您尚未设置支付密码！\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/getBinding_Bank_Card",
    "title": "",
    "name": "getBinding_Bank_Card",
    "group": "PayMent",
    "description": "<p>getBinding_Bank_Card api.绑定银行卡提交新浪获取短信验证码接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_code",
            "description": "<p>银行编号()</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_no",
            "description": "<p>手机号(银行卡绑定手机号)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_account_no",
            "description": "<p>银行卡号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_type",
            "description": "<p>银行卡类型(借记卡：DEBIT,贷记-信用卡：CREDIT)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_attribute",
            "description": "<p>银行卡属性(对公：C，对私：B)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省份</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_branch",
            "description": "<p>开户行（选填）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uaa_account_type",
            "description": "<p>账户类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uaa_remark_name",
            "description": "<p>备注（选填）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170227110141\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"S1HisT6AfR91CR5c88i0oEzwceR6CGMZDZonSfK+iso1ODL0JcffQorrSYO/h2slRcDX7uUl5lzwWAIYbBAxWHhlVfu5jxkbGwQGl0cTBq6UPEeKtV9vOavLglI/sOxCieuL5MDBbR80hWGS+7wLqr7P8mQiFLIVMgue5rwIHKU=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"ticket\":\"7553a2c359b24bc2be512096a5a2435f\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-getBinding_Bank_Card-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"Suc_No_PayKey\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/getUnbindCardCode",
    "title": "",
    "name": "getUnbindCardCode",
    "group": "PayMent",
    "description": "<p>getUnbindCardCode api.获取解绑银行卡新浪短信验证码接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_no",
            "description": "<p>银行卡号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-getUnbindCardCode-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225100654\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"gpmF1TdbUMoa8E2bFggpt1fPYEva5vGO3zj43AiHdvDmbJkwC0n9PsWe0Rid98tFHRqZ3pRnMEMzJrkgMKSeMWjvryScravO809+qayLQiCSNtMlx1GqPazT9AG4NNNHso4AqiW0t6ggv/6z18wkRwf2Oc217unocPn+FIT6Yyc=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"NO_BANK_CARD_INFO\",\"response_message\":\"无相关银行卡信息\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/handle_withhold_authority",
    "title": "",
    "name": "handle_withhold_authority",
    "group": "PayMent",
    "description": "<p>handle_withhold_authority api.委托扣款重定向接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quota",
            "description": "<p>单笔额度(选填)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day_quota",
            "description": "<p>日累计额度(选填)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"提交成功\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-create_hosting_deposit-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225102757\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"dH7ytD+jmyWe/WduTajMZD278/xhVl+VOdYbHEyvX7PGMSsjvgDv5vd+hoyErC6BJ8TquYM78SWzbt/ehK/VHyRE95KuYQ3IbgAZzotvfHv11uBETPdcpRf1QIJ4DYwx+NuxisAxPU+gatV4+ZFaSoH3SoQ5+lA/NnKT6zlpwQc=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"REALNAME_CHECK_FAIL\",\"response_message\":\"您尚未设置实名信息\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/modify_pay_password",
    "title": "",
    "name": "modify_pay_password",
    "group": "PayMent",
    "description": "<p>modify_pay_password api.修改支付密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170224145229\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"redirect_url\":\"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-modify_pay_password-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170224151557\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"CMV3DZ34XYC3mxpDiQiVN2XD9x7iv/ogTNBvA9OS4WcMZekPMu9lL+5ydsy4Ly/vTvCUwVgUCwZ0K9B0rtlp4rAa3/i6QCgM4JaK3I5i7/W4TbHQPgJrz2qXLo13nLYmYRzvzCTe0PBUOjv+VQBjwyuKCoTQwyML3YHdVBHdrg0=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"抱歉！会员状态未激活，您尚未设置支付密码！\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/modify_withhold_authority",
    "title": "",
    "name": "modify_withhold_authority",
    "group": "PayMent",
    "description": "<p>modify_withhold_authority api.修改扣款重定向接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quota",
            "description": "<p>单笔额度(选填)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "day_quota",
            "description": "<p>日累计额度</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"提交成功\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-create_hosting_deposit-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225104325\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"yTPw5O+88WPfR1EKCJahO+Z1PSYggIsb614UvcW8wNuXCYW55vZ+AijCQHJlPPEjvtIUTK+aezs+ZnpOcduTe8ELFhcM2Ope7uWQcP/EW7YGsnARBSg+nBQCAbIb0MRlVGG8k7zb5uaMk5xNsh9iha91gPqgyNpLqfwoOOvFZfc=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"抱歉！会员状态未激活，您尚未设置支付密码！\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/queryCardBindSina",
    "title": "",
    "name": "queryCardBindSina",
    "group": "PayMent",
    "description": "<p>queryCardBindSina api.查询新浪平台绑定的所有卡</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":[{\"uaa_user_id\":2568,\"uaa_account_name\":\"ICBC\",\"uaa_account_type\":2,\"uaa_platform_address\":\"xxxxx\",\"uaa_user_address\":\"235625489562513\",\"uaa_remark_name\":\"测试\",\"uaa_bank_deposit\":\"解放路支行\",\"request_no\":\"10215\",\"identity_type\":\"普通用户\",\"bank_code\":\"ICBC\",\"card_type\":\"1\",\"card_attribute\":\"2\",\"province\":\"河北\",\"city\":\"石家庄\",\"client_ip\":\"::ffff:192.168.0.211\",\"create_date\":\"1487656680589\",\"update_date\":\"1487656680589\",\"card_id\":null,\"is_verified\":null,\"is_sina_card\":1}]}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-queryCardBindSina-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"Err_QueryCardBindSina_Fail\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/queryIsBindCard",
    "title": "",
    "name": "queryIsBindCard",
    "group": "PayMent",
    "description": "<p>queryIsBindCard api.查询是否绑定银行卡</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"SUC_BindCard\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-queryIsBindCard-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"SUC_No_BindCard\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/queryRealNameAuthentication",
    "title": "",
    "name": "queryRealNameAuthentication",
    "group": "PayMent",
    "description": "<p>queryRealNameAuthentication api.查询是否已经实名</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":1,\"message\":\"Suc_RealNameAuthentication\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-queryRealNameAuthentication-Response:",
          "content": "{\"status\":0,\"message\":\"ERR_No_RealNameAuthentication\"}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/querySetPayKey",
    "title": "",
    "name": "querySetPayKey",
    "group": "PayMent",
    "description": "<p>querySetPayKey api.查询是否设置支付密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"Suc_PayKey_Exist\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-querySetPayKey-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"Suc_No_PayKey\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/query_account_details",
    "title": "",
    "name": "query_account_details",
    "group": "PayMent",
    "description": "<p>query_account_details api.查询收支明细接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>结束时间</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170227164443\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"MJF4auFVEItFaIKBquqAKpauC+i0uwjLuFf0Sy7W0kIIGQX4PnFvwil+Kj1DL5Y9Ws/oeKQkXWIry6p0yMjvCnBqvGhSFDmVnArbCzaxCFksJOmaRnVJY0xjnwFlgXexkfxchUMwepJ5s7YprywXechRU9t+vrnqQYIZNFoAXLk=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"balance\":\"0.00\",\"available_balance\":\"0.00\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-query_account_details-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"sign\":\"Tl2KfnIFPh4FW1pNwMgXJUPXqxrU2eRKrcrkWXbScd2dwPX6zlhnmr8FRvIpWMHCrcovZImKduXvrhDA0xQSvdBRgC+wweXHZEpFjVl1a0bq+yqmog875QGKVeQl+01NC3d8tCnOijIbMW17tBKMD9xaUFDhrE4rUlnWYD3zKgc=\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"response_time\":\"20170227170024\",\"response_message\":\"查询请求跨度太大,最大查询3个月\",\"sign_type\":\"RSA\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"error_url\":\"https://test.pay.sina.com.cn/website/error?ft=636aed3f-e544-4242-8e99-c94cc61e3024\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/query_balance",
    "title": "",
    "name": "query_balance",
    "group": "PayMent",
    "description": "<p>query_balance api.查询新浪账户余额接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170227164443\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"MJF4auFVEItFaIKBquqAKpauC+i0uwjLuFf0Sy7W0kIIGQX4PnFvwil+Kj1DL5Y9Ws/oeKQkXWIry6p0yMjvCnBqvGhSFDmVnArbCzaxCFksJOmaRnVJY0xjnwFlgXexkfxchUMwepJ5s7YprywXechRU9t+vrnqQYIZNFoAXLk=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"balance\":\"0.00\",\"available_balance\":\"0.00\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-query_balance-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225103405\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"Lx2PDsIp1gsmyUyOqMM7B6bu7ydXij/cRdkTfL5YthEgnry2ogszm8euk5nN3e3HzarasTCNfCUcrwMCB1Yv9bDYNwKwdcGSQ8hb8h/B9lpEG0mFx2ppGs6SBueXUoMDtsFOr6WJRrbz8XCU+IDi5uLHSj2m7yj20TUkhnIiOBg=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"抱歉！会员状态未激活，您尚未设置支付密码！\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/query_hosting_deposit",
    "title": "",
    "name": "query_hosting_deposit",
    "group": "PayMent",
    "description": "<p>query_hosting_deposit api.托管充值查询接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"sign\":\"DKRINF3nmpL0e879G0EB/AcuIQkNZ4btl1BClzwRMhOF1qeNNuRVwmib4keykSVTVesi+oG59kXNDD5s2B8jAPmugj4DzthxPTOgIwLr+V17cAqW7RiQQxfNznUtjl5HaO77x/NbSP6laNf/ePJQessLg8NZFwpggD+bXFenLIU=\",\"sign_version\":\"1.0\",\"partner_id\":\"200004595271\",\"page_size\":\"20\",\"_input_charset\":\"utf-8\",\"response_time\":\"20170227170052\",\"response_message\":\"提交成功\",\"total_item\":\"4\",\"sign_type\":\"RSA\",\"response_code\":\"APPLY_SUCCESS\",\"deposit_list\":\"201702271341111008^5000.00^PROCESSING^20170227134107^20170227134107|201702271340571089^5000.00^PROCESSING^20170227134053^20170227134053|201702271339391566^5000.00^PROCESSING^20170227133935^20170227133935|201702271324191202^5000.00^PROCESSING^20170227132415^20170227132415\",\"page_no\":\"1\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-query_hosting_deposit-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"sign\":\"Tl2KfnIFPh4FW1pNwMgXJUPXqxrU2eRKrcrkWXbScd2dwPX6zlhnmr8FRvIpWMHCrcovZImKduXvrhDA0xQSvdBRgC+wweXHZEpFjVl1a0bq+yqmog875QGKVeQl+01NC3d8tCnOijIbMW17tBKMD9xaUFDhrE4rUlnWYD3zKgc=\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"response_time\":\"20170227170024\",\"response_message\":\"查询请求跨度太大,最大查询1个月\",\"sign_type\":\"RSA\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"error_url\":\"https://test.pay.sina.com.cn/website/error?ft=636aed3f-e544-4242-8e99-c94cc61e3024\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/query_withhold_authority",
    "title": "",
    "name": "query_withhold_authority",
    "group": "PayMent",
    "description": "<p>query_withhold_authority api.查看用户是否委托扣款接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170225102204\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"XEa2FplqGsM4SVEV5LYOeaWAj84hZEAuIEgaNJug2SYmWkVQZyiWDdORnabAy0bzjthiOnQq7elihOLriUK1bBvTjwvBtly3BblHCyZ0mSVm6qdMXyqNUsXtqdtfnbUppmDxOKr4naUQjZnJ/aJf4SyOAVvME2VzDXLvVG+QTLo=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"is_withhold_authoity\":\"N\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-query_withhold_authority-Response:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/realNameAuthentication",
    "title": "",
    "name": "realNameAuthentication",
    "group": "PayMent",
    "description": "<p>realNameAuthentication api.实名认证接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identityCard",
            "description": "<p>身份证号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realName",
            "description": "<p>真实名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\":\n    {\n      \"success\":1,\n      \"message\":\"SUC_TOKEN_REFRESH\"\n    },\n  \"result\":\n    {\n      \"token\":\"cyeK4homoeY/k7ysDDeB3EiRJ1jZLYthi3XWzFCJ04X1w/6aXvbXBzRt7SO5U5zw70eLoYJU...\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-realNameAuthentication-Response:",
          "content": "{\n  \"status\":\n    {\n      \"success\":0,\n      \"message\":\"ERR_TOKEN_INVALID\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/relieve_withhold_authority",
    "title": "",
    "name": "relieve_withhold_authority",
    "group": "PayMent",
    "description": "<p>relieve_withhold_authority api.解除委托扣款重定向接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170225102204\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"XEa2FplqGsM4SVEV5LYOeaWAj84hZEAuIEgaNJug2SYmWkVQZyiWDdORnabAy0bzjthiOnQq7elihOLriUK1bBvTjwvBtly3BblHCyZ0mSVm6qdMXyqNUsXtqdtfnbUppmDxOKr4naUQjZnJ/aJf4SyOAVvME2VzDXLvVG+QTLo=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"is_withhold_authoity\":\"N\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-relieve_withhold_authority-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225103405\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"Lx2PDsIp1gsmyUyOqMM7B6bu7ydXij/cRdkTfL5YthEgnry2ogszm8euk5nN3e3HzarasTCNfCUcrwMCB1Yv9bDYNwKwdcGSQ8hb8h/B9lpEG0mFx2ppGs6SBueXUoMDtsFOr6WJRrbz8XCU+IDi5uLHSj2m7yj20TUkhnIiOBg=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"抱歉！会员状态未激活，您尚未设置支付密码！\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/saveBankCardInfo",
    "title": "",
    "name": "saveBankCardInfo",
    "group": "PayMent",
    "description": "<p>saveBankCardInfo api.绑定银行卡接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ticket",
            "description": "<p>新浪返回(getBinding_Bank_Card接口返回结果)ticket</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "valid_code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170227110453\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"07AzxcTppZrfPsHv9XCcrbk3Ax6wqmFwCvjz4gUWFxuy36JHBKXrBCh8cm6m6n7d8AqwrDnUFkisMPZbG13yX8TOf33uxt7X7j+c7znFNaQTVCOKrWq6e7bSehDgAjzXsY0wQHDk/lyM6mXduTFRLgtNqQ4e/xXiPkmdUfTKOKk=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"card_id\":\"171570\",\"is_verified\":\"Y\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-saveBankCardInfo-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225165334\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"ukI6xp3EovPL5Ep9FCwqqj5HWQ+/DIEuvKlX/zMgQFzS2cP0oueDxU1ghdHHU9LCzAFhy+yLrX1sgkHsSJpRadRKLDSJ7OpysTrVPVQ1dIbGB0MiMmO/3YKDCi0Dx8VV3ctczcPugaLSZ1D2qnBCeDwbmXfr+ok7RJ/BzmFOewo=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"ILLEGAL_ARGUMENT\",\"response_message\":\"ticket不存在或已失效\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/sendPhoneCode",
    "title": "",
    "name": "sendPhoneCode",
    "group": "PayMent",
    "description": "<p>sendPhoneCode api.发送手机验证码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>手机号码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":\"agnECi\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-sendPhoneCode-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":\"发送失败\"}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/set_pay_password",
    "title": "",
    "name": "set_pay_password",
    "group": "PayMent",
    "description": "<p>set_pay_password api.设置支付密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":{\"success\":1,\"message\":{\"response_time\":\"20170224145229\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"APPLY_SUCCESS\",\"response_message\":\"提交成功\",\"redirect_url\":\"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-set_pay_password-Response:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  },
  {
    "type": "post",
    "url": "/unBindCard",
    "title": "",
    "name": "unBindCard",
    "group": "PayMent",
    "description": "<p>unBindCard api.解绑银行卡接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ticket",
            "description": "<p>获取验证码时返回的</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "valid_code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "无",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-unBindCard-Response:",
          "content": "{\"status\":{\"success\":0,\"message\":{\"response_time\":\"20170225100654\",\"partner_id\":\"200004595271\",\"_input_charset\":\"utf-8\",\"sign\":\"gpmF1TdbUMoa8E2bFggpt1fPYEva5vGO3zj43AiHdvDmbJkwC0n9PsWe0Rid98tFHRqZ3pRnMEMzJrkgMKSeMWjvryScravO809+qayLQiCSNtMlx1GqPazT9AG4NNNHso4AqiW0t6ggv/6z18wkRwf2Oc217unocPn+FIT6Yyc=\",\"sign_type\":\"RSA\",\"sign_version\":\"1.0\",\"response_code\":\"NO_BANK_CARD_INFO\",\"response_message\":\"无相关银行卡信息\"}}}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/index.js",
    "groupTitle": "PayMent"
  }
] });
