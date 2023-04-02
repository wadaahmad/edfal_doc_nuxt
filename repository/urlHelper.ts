export class urlHelper {
    static sosmedList = ['whatsapp', 'twitter', 'facebook', 'instagram']
    static sosmedUrlGenerator(sosmed: any, accountName: any) {
        var sosmedUrl = sosmed.split('.').length > 1 ? sosmed : 'https://' + sosmed + ".com"
        var accountUser = accountName.replace('@', '')
        if (sosmed == 'whatsapp') {
            sosmedUrl = 'https://wa.me'
            // console.log(accountName)
            accountUser = accountName.replace(/[^a-zA-Z0-9 ]/g, "")

            if (accountUser.charAt(0) == '0')
                accountUser = '62' + accountUser.substring(1)

        }

        return sosmedUrl + '/' + accountUser
    }
}