const express = require('express');
const router = express.Router();
const { register, doReserve, reserveInfo, reserveInfo_old, paymentInfo } = require('./customers.ctrl')
const { checkToLogin, checkToNotLogin } = require('../../middleware/loginCheck')

/**
 * 소비자 회원가입
 */
router.post('/register', checkToNotLogin, register);

/**
 * 유저 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve', checkToLogin, reserveInfo);

/**
 * 유저 이전 예약 현황
 * 로그인 데이터 필요
 */
router.get('/reserve/old', checkToLogin, reserveInfo_old);

/**
 * 예약하기
 * 로그인 데이터 필요
 */
router.post('/reserve/:storeid', checkToLogin, doReserve);

/**
 * 결제정보
 * payment 필요
 * 로그인 필요
 */
router.get('/reserve/payment/:storeid', checkToLogin, paymentInfo)

/**
 * 예약취소
 * 로그인 데이터 필요
 */
router.delete('/reserve/:storeid', checkToLogin);

module.exports = router;