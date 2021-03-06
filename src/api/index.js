const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/ad-store', require('./ad-store'));
router.use('/customers', require('./customers'));
router.use('/owners', require('./owners'));
router.use('/reserve', require('./reserve'));
router.use('/store', require('./store'));

router.get('/test', async function(req, res) {
    const cus = require('../models/customer');
    const result = await cus.test();
    res.json(result);
})

router.get('/test/:message', function (req, res) {
    const { message } = req.params

    if (!message) return res.status(418).json('나는 커피를 끓이는 것을 원하지 않는다 아이스 아메리카노를 가져와라')

    res.status(200).json({
        message: `이 메시지는 클라이언트에서 보내온 ${message}에서 최초로 시작되어 
        일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고
         지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다.
        이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다.
        복사를 해도 좋습니다.
         혹 미신이라 하실지 모르지만 사실입니다.
          영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다.
           그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다.
            어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다.
             그는 곧 사직되었습니다.
              나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 
              미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 
              결국 9일 후 그는 암살 당했습니다. 기억해 주세요. 
              이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 
              그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 
              이 편지를 받은 사람은 행운이 깃들 것입니다. 
        힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서..`
    })
})

router.get('/kakao', passport.authenticate('kakao'))

module.exports = router;