class IcsEmail {
    constructor(arr) {
        this._token = "d656b989-5ee8-4db6-8fed-fb3bb59a98bb";
    }

    set token(token) {
        this._token = token;
    }

    get token() {
        return this._token;
    }

    sendEmail(
        from = "test1@instapack.es",
        to = "test1@instapack.es",
        subject = "INSTAPACK Developer Team",
        body = ""){
        Email.send({
            SecureToken : this.token,
            From: from,
            To: to,
            Subject: subject,
            Body: body
        }).then(
            message => alert(message)
        );
    }

}