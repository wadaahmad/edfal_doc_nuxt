export class stringHelper {
    static dayIdn = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
    static monthIdn = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    static dayUs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    static monthUs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    static greeting = computed(() => {
        var today = new Date()
        var curHr = today.getHours()
        var greeting = ''

        if (curHr < 12) {
            greeting = 'Good morning'
        } else if (curHr < 18) {
            greeting = 'Good afternoon'
        } else {
            greeting = 'Good evening'
        }
        return greeting
    })
    static yearNow = computed(() => {
        var d = new Date()
        return d.getFullYear()
    })
    static yearList = computed(() => {
        var d = new Date()
        let result = Array()
        for (let index = 1990; index <= d.getFullYear(); index++) {
            result.push(index);
        }
        result.reverse()
        return result
    })
    public static valueOf(value: any, toInteger: boolean = false) {
        if (value == undefined) {
            if (toInteger)
                return 0
            return ''
        }
        return value
    }
    public static curlyFinder(data: string): Array<String> | null {
        var pattern = /[^{\}]+(?=})/g
        return data.match(pattern)
    }
    public static charUrlFriendly(str: string) {
        return (str.replace(/[^\w\s]/gi, '')).replaceAll(' ', '-').toLowerCase()
    }

}