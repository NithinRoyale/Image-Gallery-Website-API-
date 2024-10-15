function sendotp() 
{
    const email = document.getElementById('emailInp');
    const otpverify = document.getElementsByClassName('otpverify')[0];

    let otpval= Math.floor(Math.random()*10000);
    let emailbody =`<h2> Your OTP is </h2>${otpval}`


    Email.send({
        SecureToken : "8356c43c-2995-4f61-b6c6-18eaafea3dd4",
        To : email.value,
        From : "21i231@psgtech.ac.in",
        Subject : "Email OTP Verification",
        Body : emailbody,
    }).then(
      message => {

      if (message === "OK") {
        alert("OTP sent to your email " + email.value);

        otpverify.style.display = "flex";
        const otp_inp = document.getElementById('otpInp');
        const otp_btn = document.getElementById('otpbtn');
        const reg = document.getElementById('register');

        otp_btn.addEventListener('click', () => {
            if (otp_inp.value == otpval) {
                alert("Email address verified...");
                reg.style.display="block";
            } else {
                alert("Invalid OTP");
            }
        });
    }else {
        alert("Failed to send OTP. Please try again.");

    }
}
).catch((error) => {
alert("Error in sending email: " + error);
});
}