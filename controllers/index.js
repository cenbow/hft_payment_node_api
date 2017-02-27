/**
*description router class
*@date 2107-02-20
*@author shenyuhang
*/
var express = require('express'), router = express.Router();
var payment = require('./payment.js');

/**
* @api {post} /realNameAuthentication
* @apiName realNameAuthentication
* @apiGroup PayMent
*
* @apiDescription realNameAuthentication api.实名认证接口
*
* @apiParam {String} identityCard 身份证号
* @apiParam {String} realName 真实名字
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {
*   "status":
*     {
*       "success":1,
*       "message":"SUC_TOKEN_REFRESH"
*     },
*   "result":
*     {
*       "token":"cyeK4homoeY/k7ysDDeB3EiRJ1jZLYthi3XWzFCJ04X1w/6aXvbXBzRt7SO5U5zw70eLoYJU..."
*     }
* }
*  @apiErrorExample {json} Invalid-realNameAuthentication-Response:
* {
*   "status":
*     {
*       "success":0,
*       "message":"ERR_TOKEN_INVALID"
*     }
* }
**/
router.post('/realNameAuthentication', payment.payMent.realNameAuthentication);

/**
* @api {post} /saveBankCardInfo
* @apiName saveBankCardInfo
* @apiGroup PayMent
* @apiDescription saveBankCardInfo api.绑定银行卡接口
* @apiParam {String} ticket 新浪返回(getBinding_Bank_Card接口返回结果)ticket
* @apiParam {String} valid_code 验证码
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170227110453","partner_id":"200004595271","_input_charset":"utf-8","sign":"07AzxcTppZrfPsHv9XCcrbk3Ax6wqmFwCvjz4gUWFxuy36JHBKXrBCh8cm6m6n7d8AqwrDnUFkisMPZbG13yX8TOf33uxt7X7j+c7znFNaQTVCOKrWq6e7bSehDgAjzXsY0wQHDk/lyM6mXduTFRLgtNqQ4e/xXiPkmdUfTKOKk=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","card_id":"171570","is_verified":"Y"}}}
* @apiErrorExample {json} Invalid-saveBankCardInfo-Response:
* {"status":{"success":0,"message":{"response_time":"20170225165334","partner_id":"200004595271","_input_charset":"utf-8","sign":"ukI6xp3EovPL5Ep9FCwqqj5HWQ+/DIEuvKlX/zMgQFzS2cP0oueDxU1ghdHHU9LCzAFhy+yLrX1sgkHsSJpRadRKLDSJ7OpysTrVPVQ1dIbGB0MiMmO/3YKDCi0Dx8VV3ctczcPugaLSZ1D2qnBCeDwbmXfr+ok7RJ/BzmFOewo=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"ticket不存在或已失效"}}}
**/
router.post('/saveBankCardInfo', payment.payMent.saveBankCardInfo);

/**
* @api {post} /getBinding_Bank_Card
* @apiName getBinding_Bank_Card
* @apiGroup PayMent
* @apiDescription getBinding_Bank_Card api.绑定银行卡提交新浪获取短信验证码接口
* @apiParam {String} user_id 用户id
* @apiParam {String} bank_code 银行编号()
* @apiParam {String} phone_no 手机号(银行卡绑定手机号)
* @apiParam {String} bank_account_no 银行卡号
* @apiParam {String} card_type 银行卡类型(借记卡：DEBIT,贷记-信用卡：CREDIT)
* @apiParam {String} card_attribute 银行卡属性(对公：C，对私：B)
* @apiParam {String} province 省份
* @apiParam {String} city 城市
* @apiParam {String} bank_branch 开户行（选填）
* @apiParam {String} uaa_account_type 账户类型
* @apiParam {String} uaa_remark_name 备注（选填）
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":0,"message":{"response_time":"20170227110141","partner_id":"200004595271","_input_charset":"utf-8","sign":"S1HisT6AfR91CR5c88i0oEzwceR6CGMZDZonSfK+iso1ODL0JcffQorrSYO/h2slRcDX7uUl5lzwWAIYbBAxWHhlVfu5jxkbGwQGl0cTBq6UPEeKtV9vOavLglI/sOxCieuL5MDBbR80hWGS+7wLqr7P8mQiFLIVMgue5rwIHKU=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","ticket":"7553a2c359b24bc2be512096a5a2435f"}}}
* @apiErrorExample {json} Invalid-getBinding_Bank_Card-Response:
* {"status":{"success":0,"message":"Suc_No_PayKey"}}
**/
router.post('/getBinding_Bank_Card', payment.payMent.getBinding_Bank_Card);
	
/**
* @api {post} /getUnbindCardCode
* @apiName getUnbindCardCode
* @apiGroup PayMent
* @apiDescription getUnbindCardCode api.获取解绑银行卡新浪短信验证码接口
* @apiParam {String} user_id 用户id
* @apiParam {String} card_no 银行卡号
* @apiSuccessExample {json} Success-Response:
* 无
* @apiErrorExample {json} Invalid-getUnbindCardCode-Response:
* {"status":{"success":0,"message":{"response_time":"20170225100654","partner_id":"200004595271","_input_charset":"utf-8","sign":"gpmF1TdbUMoa8E2bFggpt1fPYEva5vGO3zj43AiHdvDmbJkwC0n9PsWe0Rid98tFHRqZ3pRnMEMzJrkgMKSeMWjvryScravO809+qayLQiCSNtMlx1GqPazT9AG4NNNHso4AqiW0t6ggv/6z18wkRwf2Oc217unocPn+FIT6Yyc=","sign_type":"RSA","sign_version":"1.0","response_code":"NO_BANK_CARD_INFO","response_message":"无相关银行卡信息"}}}
**/
router.post('/getUnbindCardCode', payment.payMent.getUnbindCardCode);

/**
* @api {post} /unBindCard
* @apiName unBindCard
* @apiGroup PayMent
* @apiDescription unBindCard api.解绑银行卡接口
* @apiParam {String} user_id 用户id
* @apiParam {String} ticket 获取验证码时返回的
* @apiParam {String} valid_code 验证码
* @apiSuccessExample {json} Success-Response:
* 无
* @apiErrorExample {json} Invalid-unBindCard-Response:
* {"status":{"success":0,"message":{"response_time":"20170225100654","partner_id":"200004595271","_input_charset":"utf-8","sign":"gpmF1TdbUMoa8E2bFggpt1fPYEva5vGO3zj43AiHdvDmbJkwC0n9PsWe0Rid98tFHRqZ3pRnMEMzJrkgMKSeMWjvryScravO809+qayLQiCSNtMlx1GqPazT9AG4NNNHso4AqiW0t6ggv/6z18wkRwf2Oc217unocPn+FIT6Yyc=","sign_type":"RSA","sign_version":"1.0","response_code":"NO_BANK_CARD_INFO","response_message":"无相关银行卡信息"}}}
**/
router.post('/unBindCard', payment.payMent.unBindCard);

/**
* @api {post} /querySetPayKey
* @apiName querySetPayKey
* @apiGroup PayMent
* @apiDescription querySetPayKey api.查询是否设置支付密码
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"Suc_PayKey_Exist"}}
* @apiErrorExample {json} Invalid-querySetPayKey-Response:
* {"status":{"success":0,"message":"Suc_No_PayKey"}}
**/
router.post('/querySetPayKey', payment.payMent.querySetPayKey);



/**
* @api {post} /set_pay_password
* @apiName set_pay_password
* @apiGroup PayMent
* @apiDescription set_pay_password api.设置支付密码
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170224145229","partner_id":"200004595271","_input_charset":"utf-8","sign":"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","redirect_url":"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5"}}}
* @apiErrorExample {json} Invalid-set_pay_password-Response:
* 无
**/
router.post('/set_pay_password', payment.payMent.set_pay_password);
/**
* @api {post} /find_pay_password
* @apiName find_pay_password
* @apiGroup PayMent
* @apiDescription find_pay_password api.找回支付密码
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170224145229","partner_id":"200004595271","_input_charset":"utf-8","sign":"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","redirect_url":"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5"}}}
* @apiErrorExample {json} Invalid-find_pay_password-Response:
* {"status":{"success":0,"message":{"response_time":"20170224151557","partner_id":"200004595271","_input_charset":"utf-8","sign":"CMV3DZ34XYC3mxpDiQiVN2XD9x7iv/ogTNBvA9OS4WcMZekPMu9lL+5ydsy4Ly/vTvCUwVgUCwZ0K9B0rtlp4rAa3/i6QCgM4JaK3I5i7/W4TbHQPgJrz2qXLo13nLYmYRzvzCTe0PBUOjv+VQBjwyuKCoTQwyML3YHdVBHdrg0=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"抱歉！会员状态未激活，您尚未设置支付密码！"}}}
**/
router.post('/find_pay_password', payment.payMent.find_pay_password);

/**
* @api {post} /modify_pay_password
* @apiName modify_pay_password
* @apiGroup PayMent
* @apiDescription modify_pay_password api.修改支付密码
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170224145229","partner_id":"200004595271","_input_charset":"utf-8","sign":"VjF+xFKOLs/oAQOPbIsBor2fhDrlaz9Mdmssf110WXmK43h1vosljaB2ZL+oh0bw2kc/bMLXWt8nLi02udGVD8/BeNfZ41WIYiSYnB8dt8qWJdTpqrx+a2B0DpwiFxCcQUsOd/zeBx6cNcZndzzBcvY+ZdTmsZPyHg67Vg9yWJI=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","redirect_url":"https://test.pay.sina.com.cn/zjtg/website/view/set_paypwd.html?ft=a57c587d-ca70-4e33-9189-3cc0191f83a5"}}}
* @apiErrorExample {json} Invalid-modify_pay_password-Response:
* {"status":{"success":0,"message":{"response_time":"20170224151557","partner_id":"200004595271","_input_charset":"utf-8","sign":"CMV3DZ34XYC3mxpDiQiVN2XD9x7iv/ogTNBvA9OS4WcMZekPMu9lL+5ydsy4Ly/vTvCUwVgUCwZ0K9B0rtlp4rAa3/i6QCgM4JaK3I5i7/W4TbHQPgJrz2qXLo13nLYmYRzvzCTe0PBUOjv+VQBjwyuKCoTQwyML3YHdVBHdrg0=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"抱歉！会员状态未激活，您尚未设置支付密码！"}}}
**/
router.post('/modify_pay_password', payment.payMent.modify_pay_password);

/**
* @api {post} /sendPhoneCode
* @apiName sendPhoneCode
* @apiGroup PayMent
*
* @apiDescription sendPhoneCode api.发送手机验证码
*
* @apiParam {String} mobile 手机号码
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"agnECi"}}
* @apiErrorExample {json} Invalid-sendPhoneCode-Response:
* {"status":{"success":0,"message":"发送失败"}}
**/
router.post('/sendPhoneCode', payment.payMent.sendPhoneCode);

/**
* @api {post} /queryIsBindCard
* @apiName queryIsBindCard
* @apiGroup PayMent
*
* @apiDescription queryIsBindCard api.查询是否绑定银行卡
*
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"SUC_BindCard"}}
* @apiErrorExample {json} Invalid-queryIsBindCard-Response:
* {"status":{"success":0,"message":"SUC_No_BindCard"}}
**/
router.post('/queryIsBindCard', payment.payMent.queryIsBindCard);

/**
* @api {post} /queryRealNameAuthentication
* @apiName queryRealNameAuthentication
* @apiGroup PayMent
*
* @apiDescription queryRealNameAuthentication api.查询是否已经实名
*
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":1,"message":"Suc_RealNameAuthentication"}
* @apiErrorExample {json} Invalid-queryRealNameAuthentication-Response:
* {"status":0,"message":"ERR_No_RealNameAuthentication"}
**/
router.post('/queryRealNameAuthentication', payment.payMent.queryRealNameAuthentication);

/**
* @api {post} /queryCardBindSina
* @apiName queryCardBindSina
* @apiGroup PayMent
*
* @apiDescription queryCardBindSina api.查询新浪平台绑定的所有卡
*
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":[{"uaa_user_id":2568,"uaa_account_name":"ICBC","uaa_account_type":2,"uaa_platform_address":"xxxxx","uaa_user_address":"235625489562513","uaa_remark_name":"测试","uaa_bank_deposit":"解放路支行","request_no":"10215","identity_type":"普通用户","bank_code":"ICBC","card_type":"1","card_attribute":"2","province":"河北","city":"石家庄","client_ip":"::ffff:192.168.0.211","create_date":"1487656680589","update_date":"1487656680589","card_id":null,"is_verified":null,"is_sina_card":1}]}}
* @apiErrorExample {json} Invalid-queryCardBindSina-Response:
* {"status":{"success":0,"message":"Err_QueryCardBindSina_Fail"}}
**/
router.post('/queryCardBindSina', payment.payMent.queryCardBindSina);

/**
* @api {post} /create_activate_member
* @apiName create_activate_member
* @apiGroup PayMent
*
* @apiDescription create_activate_member api.创建激活会员接口
*
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"提交成功"}}
* @apiErrorExample {json} Invalid-create_activate_member-Response:
* {"status":{"success":0,"message":"用户标识信息重复"}}
**/
router.post('/create_activate_member', payment.payMent.create_activate_member);

/**
* @api {post} /create_hosting_deposit
* @apiName create_hosting_deposit
* @apiGroup PayMent
* @apiDescription create_hosting_deposit api.充值接口
* @apiParam {String} user_id 用户id
* @apiParam {String} amount 充值金额
* @apiParam {String} pay_method 支付方式(online_bank)
* @apiParam {String} bank_code 银行编号
* @apiParam {String} public_flag 对公或者对私
* @apiParam {String} debit 信用卡还是借记卡
* @apiParam {String} bank_account_no 银行卡卡号
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"sign":"jmI7QgD+TYIal5x0xcPgYLQD6CTlqIOIOlht8WHvDoxovOdVOP7WrWWT0JghnRR8/BbbgIuYPBsdig7i+PHKk+AcxtPbH/RG+p7LVjh+6qiLPz+nwud4jTLZBWDV9/kY6rznNejjw0ExG9gvXakbgF2NDz3tXCdmMwb2WA7FZJs=","redirect_url":"https://test.pay.sina.com.cn/cashdesk-web/view/recharge.html?ft=72599169-5827-4cc7-a02c-9160c6adc32c","sign_version":"1.0","partner_id":"200004595271","_input_charset":"utf-8","response_time":"20170227132415","response_message":"提交成功","deposit_status":"PROCESSING","sign_type":"RSA","response_code":"APPLY_SUCCESS","out_trade_no":"201702271324191202"}}}
* @apiErrorExample {json} Invalid-create_hosting_deposit-Response:
* {"status":{"success":0,"message":{"sign":"II4PY0ui3X4e8WgE/N0o/IdDKgVOVxAnDdVGqmFfnaS0yv/KzOQaett42z7L29GPiVATWEAZyzh3w0heD25nv7Evw+ZukaQ/hDgdIRFrocgDxeTWrtsuxcprw/MsJtXmWY0diu/T8UTWUI4Y1CRZ+uP6RN+45TaqFf+AJRCVjFQ=","partner_id":"200004595271","_input_charset":"utf-8","response_time":"20170225131705","response_message":"支付方式格式错误!","sign_type":"RSA","response_code":"ILLEGAL_ARGUMENT"}}}
**/
router.post('/create_hosting_deposit', payment.payMent.create_hosting_deposit);

/**
* @api {post} /handle_withhold_authority
* @apiName handle_withhold_authority
* @apiGroup PayMent
* @apiDescription handle_withhold_authority api.委托扣款重定向接口
* @apiParam {String} user_id 用户id
* @apiParam {String} quota 单笔额度(选填)
* @apiParam {String} day_quota 日累计额度(选填)
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"提交成功"}}
* @apiErrorExample {json} Invalid-create_hosting_deposit-Response:
* {"status":{"success":0,"message":{"response_time":"20170225102757","partner_id":"200004595271","_input_charset":"utf-8","sign":"dH7ytD+jmyWe/WduTajMZD278/xhVl+VOdYbHEyvX7PGMSsjvgDv5vd+hoyErC6BJ8TquYM78SWzbt/ehK/VHyRE95KuYQ3IbgAZzotvfHv11uBETPdcpRf1QIJ4DYwx+NuxisAxPU+gatV4+ZFaSoH3SoQ5+lA/NnKT6zlpwQc=","sign_type":"RSA","sign_version":"1.0","response_code":"REALNAME_CHECK_FAIL","response_message":"您尚未设置实名信息"}}}
**/
router.post('/handle_withhold_authority', payment.payMent.handle_withhold_authority);

/**
* @api {post} /modify_withhold_authority
* @apiName modify_withhold_authority
* @apiGroup PayMent
* @apiDescription modify_withhold_authority api.修改扣款重定向接口
* @apiParam {String} user_id 用户id
* @apiParam {String} quota 单笔额度(选填)
* @apiParam {String} day_quota 日累计额度
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":"提交成功"}}
* @apiErrorExample {json} Invalid-create_hosting_deposit-Response:
* {"status":{"success":0,"message":{"response_time":"20170225104325","partner_id":"200004595271","_input_charset":"utf-8","sign":"yTPw5O+88WPfR1EKCJahO+Z1PSYggIsb614UvcW8wNuXCYW55vZ+AijCQHJlPPEjvtIUTK+aezs+ZnpOcduTe8ELFhcM2Ope7uWQcP/EW7YGsnARBSg+nBQCAbIb0MRlVGG8k7zb5uaMk5xNsh9iha91gPqgyNpLqfwoOOvFZfc=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"抱歉！会员状态未激活，您尚未设置支付密码！"}}}
**/
router.post('/modify_withhold_authority', payment.payMent.modify_withhold_authority);

/**
* @api {post} /query_withhold_authority
* @apiName query_withhold_authority
* @apiGroup PayMent
* @apiDescription query_withhold_authority api.查看用户是否委托扣款接口
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170225102204","partner_id":"200004595271","_input_charset":"utf-8","sign":"XEa2FplqGsM4SVEV5LYOeaWAj84hZEAuIEgaNJug2SYmWkVQZyiWDdORnabAy0bzjthiOnQq7elihOLriUK1bBvTjwvBtly3BblHCyZ0mSVm6qdMXyqNUsXtqdtfnbUppmDxOKr4naUQjZnJ/aJf4SyOAVvME2VzDXLvVG+QTLo=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","is_withhold_authoity":"N"}}}
* @apiErrorExample {json} Invalid-query_withhold_authority-Response:
* 无
**/
router.post('/query_withhold_authority', payment.payMent.query_withhold_authority);

/**
* @api {post} /relieve_withhold_authority
* @apiName relieve_withhold_authority
* @apiGroup PayMent
* @apiDescription relieve_withhold_authority api.解除委托扣款重定向接口
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170225102204","partner_id":"200004595271","_input_charset":"utf-8","sign":"XEa2FplqGsM4SVEV5LYOeaWAj84hZEAuIEgaNJug2SYmWkVQZyiWDdORnabAy0bzjthiOnQq7elihOLriUK1bBvTjwvBtly3BblHCyZ0mSVm6qdMXyqNUsXtqdtfnbUppmDxOKr4naUQjZnJ/aJf4SyOAVvME2VzDXLvVG+QTLo=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","is_withhold_authoity":"N"}}}
* @apiErrorExample {json} Invalid-relieve_withhold_authority-Response:
* {"status":{"success":0,"message":{"response_time":"20170225103405","partner_id":"200004595271","_input_charset":"utf-8","sign":"Lx2PDsIp1gsmyUyOqMM7B6bu7ydXij/cRdkTfL5YthEgnry2ogszm8euk5nN3e3HzarasTCNfCUcrwMCB1Yv9bDYNwKwdcGSQ8hb8h/B9lpEG0mFx2ppGs6SBueXUoMDtsFOr6WJRrbz8XCU+IDi5uLHSj2m7yj20TUkhnIiOBg=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"抱歉！会员状态未激活，您尚未设置支付密码！"}}}
**/
router.post('/relieve_withhold_authority', payment.payMent.relieve_withhold_authority);

/**
* @api {post} /query_balance
* @apiName query_balance
* @apiGroup PayMent
* @apiDescription query_balance api.查询新浪账户余额接口
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170227164443","partner_id":"200004595271","_input_charset":"utf-8","sign":"MJF4auFVEItFaIKBquqAKpauC+i0uwjLuFf0Sy7W0kIIGQX4PnFvwil+Kj1DL5Y9Ws/oeKQkXWIry6p0yMjvCnBqvGhSFDmVnArbCzaxCFksJOmaRnVJY0xjnwFlgXexkfxchUMwepJ5s7YprywXechRU9t+vrnqQYIZNFoAXLk=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","balance":"0.00","available_balance":"0.00"}}}
* @apiErrorExample {json} Invalid-query_balance-Response:
* {"status":{"success":0,"message":{"response_time":"20170225103405","partner_id":"200004595271","_input_charset":"utf-8","sign":"Lx2PDsIp1gsmyUyOqMM7B6bu7ydXij/cRdkTfL5YthEgnry2ogszm8euk5nN3e3HzarasTCNfCUcrwMCB1Yv9bDYNwKwdcGSQ8hb8h/B9lpEG0mFx2ppGs6SBueXUoMDtsFOr6WJRrbz8XCU+IDi5uLHSj2m7yj20TUkhnIiOBg=","sign_type":"RSA","sign_version":"1.0","response_code":"ILLEGAL_ARGUMENT","response_message":"抱歉！会员状态未激活，您尚未设置支付密码！"}}}
**/
router.post('/query_balance', payment.payMent.query_balance);

/**
* @api {post} /query_account_details
* @apiName query_account_details
* @apiGroup PayMent
* @apiDescription query_account_details api.查询收支明细接口
* @apiParam {String} user_id 用户id
* @apiParam {String} start_time 开始时间
* @apiParam {String} end_time 结束时间
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"response_time":"20170227164443","partner_id":"200004595271","_input_charset":"utf-8","sign":"MJF4auFVEItFaIKBquqAKpauC+i0uwjLuFf0Sy7W0kIIGQX4PnFvwil+Kj1DL5Y9Ws/oeKQkXWIry6p0yMjvCnBqvGhSFDmVnArbCzaxCFksJOmaRnVJY0xjnwFlgXexkfxchUMwepJ5s7YprywXechRU9t+vrnqQYIZNFoAXLk=","sign_type":"RSA","sign_version":"1.0","response_code":"APPLY_SUCCESS","response_message":"提交成功","balance":"0.00","available_balance":"0.00"}}}
* @apiErrorExample {json} Invalid-query_account_details-Response:
* {"status":{"success":0,"message":{"sign":"Tl2KfnIFPh4FW1pNwMgXJUPXqxrU2eRKrcrkWXbScd2dwPX6zlhnmr8FRvIpWMHCrcovZImKduXvrhDA0xQSvdBRgC+wweXHZEpFjVl1a0bq+yqmog875QGKVeQl+01NC3d8tCnOijIbMW17tBKMD9xaUFDhrE4rUlnWYD3zKgc=","partner_id":"200004595271","_input_charset":"utf-8","response_time":"20170227170024","response_message":"查询请求跨度太大,最大查询3个月","sign_type":"RSA","response_code":"ILLEGAL_ARGUMENT","error_url":"https://test.pay.sina.com.cn/website/error?ft=636aed3f-e544-4242-8e99-c94cc61e3024"}}}
**/
router.post('/query_account_details', payment.payMent.query_account_details);

/**
* @api {post} /query_hosting_deposit
* @apiName query_hosting_deposit
* @apiGroup PayMent
* @apiDescription query_hosting_deposit api.托管充值查询接口
* @apiParam {String} user_id 用户id
* @apiSuccessExample {json} Success-Response:
* {"status":{"success":1,"message":{"sign":"DKRINF3nmpL0e879G0EB/AcuIQkNZ4btl1BClzwRMhOF1qeNNuRVwmib4keykSVTVesi+oG59kXNDD5s2B8jAPmugj4DzthxPTOgIwLr+V17cAqW7RiQQxfNznUtjl5HaO77x/NbSP6laNf/ePJQessLg8NZFwpggD+bXFenLIU=","sign_version":"1.0","partner_id":"200004595271","page_size":"20","_input_charset":"utf-8","response_time":"20170227170052","response_message":"提交成功","total_item":"4","sign_type":"RSA","response_code":"APPLY_SUCCESS","deposit_list":"201702271341111008^5000.00^PROCESSING^20170227134107^20170227134107|201702271340571089^5000.00^PROCESSING^20170227134053^20170227134053|201702271339391566^5000.00^PROCESSING^20170227133935^20170227133935|201702271324191202^5000.00^PROCESSING^20170227132415^20170227132415","page_no":"1"}}}
* @apiErrorExample {json} Invalid-query_hosting_deposit-Response:
* {"status":{"success":0,"message":{"sign":"Tl2KfnIFPh4FW1pNwMgXJUPXqxrU2eRKrcrkWXbScd2dwPX6zlhnmr8FRvIpWMHCrcovZImKduXvrhDA0xQSvdBRgC+wweXHZEpFjVl1a0bq+yqmog875QGKVeQl+01NC3d8tCnOijIbMW17tBKMD9xaUFDhrE4rUlnWYD3zKgc=","partner_id":"200004595271","_input_charset":"utf-8","response_time":"20170227170024","response_message":"查询请求跨度太大,最大查询1个月","sign_type":"RSA","response_code":"ILLEGAL_ARGUMENT","error_url":"https://test.pay.sina.com.cn/website/error?ft=636aed3f-e544-4242-8e99-c94cc61e3024"}}}
**/
router.post('/query_hosting_deposit', payment.payMent.query_hosting_deposit);


exports.routes = router;
