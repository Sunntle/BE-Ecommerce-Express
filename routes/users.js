var express = require('express');
var router = express.Router();
var db = require('./../models/database');
const nodemailer =  require('nodemailer');
router.get('/dangky', (req, res) => {
    res.render('dangky',{thongbao: ''})
})
router.get('/dangnhap', function (req, res) {
    res.render("dangnhap", {isLogin:0});
});
router.get('/forgotpass', function (req, res) {
    res.render("forgotpass",{isChange:true});
});
router.get('/doipass', function (req, res) {
    res.render("doipass");
});
router.get('/thoat', function(req, res) {
    req.session.destroy();
    res.redirect("/users/dangnhap");
});
router.post('/forgotpass', function (req, res){
    let email = req.body.email;
    let sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql,[email],(err,d)=>{
        if(d.length < 1) {
            return res.redirect('forgotpass?thatbai');
        }
        const newPass = (Math.floor(Math.random() * 1000) + 100).toString()
        const bcrypt = require("bcrypt");
        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(newPass, salt);
        let sql = `UPDATE users SET password= ? WHERE email = ?`
        db.query(sql,[pass_mahoa,d[0].email], (err, data) => {
            //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
            var transporter =  nodemailer.createTransport({ // config mail server
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'taikute012532@gmail.com', //Tài khoản gmail vừa tạo
                    pass: 'yamxpfrpzyafvxzu' //Mật khẩu tài khoản gmail vừa tạo
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });
            var content = '';
            content += `
                    <div style="padding: 10px; background-color: white;">
                        <h4 style="color: #0085ff">Xin chào <b>${d[0].username}</b>!</h4>
                        <span style="color: black">Đây là mật khẩu mới của bạn <b>${newPass}</b></span>
                        Chúc bạn một ngày tốt lành !
                    </div>
            `;
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'NQH-Test nodemailer',
                to: req.body.email,
                subject: 'Cập nhật mật khẩu',
                html: content //Nội dung html mình đã tạo trên kia :))
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('forgotpass?thatbai');
                } else {
                    console.log('Message sent: ' +  info.response);
                    res.redirect('forgotpass?thanhcong');
                }
        });
});
    })
})
router.post('/doipass', function (req, res) {
    let username = req.body.username
    let op = req.body.password;
    let np = req.body.newpassword;
    var sess = req.session;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, rows) => {
        if(rows.length < 1) {
            res.redirect(`doipass?thatbai2`)
        }
        let user = rows[0]; 
        let pass_fromdb = user.password;
        const id = user.id
        const bcrypt = require("bcrypt");
        var salt = bcrypt.genSaltSync(10);
        var kq = bcrypt.compareSync(op, pass_fromdb);
        if(kq){
            var pass_mahoa = bcrypt.hashSync(np, salt);
            let sql = `UPDATE users SET password= ? WHERE id = ?`
            db.query(sql,[pass_mahoa,id], (err, d) => {
                res.redirect(`doipass?thanhcong`)
            });
        }else{
            res.redirect(`doipass?thatbai`)
        }
    });
});
router.post('/dangnhap', async function (req, res) {
    let u = req.body.username;
    let p = req.body.password;
    var sess = req.session;
    let sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [u], (err, rows) => {
        if (rows.length <= 0) {
            res.render('dangnhap',{isLogin: 1})
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.password;
        const bcrypt = require("bcrypt");
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq) {
            sess.daDangNhap = true;
            sess.username = user.userName;
            sess.role = user.role;
            if(sess.back){
                res.redirect(sess.back)
            }else {
                res.redirect(`dangnhap?thanhcong`)
            }
        }
        else {
            res.render("dangnhap",{isLogin: 2});
        }
    });
});
router.post('/luu', function (req, res) {
    let un = req.body.username;
    let pw = req.body.password;
    let email = req.body.email;
    const bcrypt = require("bcrypt");
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(pw, salt);
    let data = {
        userName: un,
        password: pass_mahoa,
        email: email
    }
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, d) => {
       res.render('dangky',{thongbao: 'Đăng kí thành công !'})
    });
})

module.exports = router;

