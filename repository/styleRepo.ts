import { useRulesRepo } from "./rulesRepo"
export function useStyleRepo() {
    let { sch } = useRulesRepo()
    onMounted(() => {
        var sheets = document.styleSheets
        var activesheet = sheets[sheets.length - 1]
        var color_main = sch?.color_main
        activesheet.insertRule("#sidebar .nuxt-link-exact-active {background: " + hexToRgba(color_main, 0.3) + ";}")

    })
    const schoolStyle = computed(() => {
        var styleTag = '<style>'
        var color_main = sch?.color_main
        var color_sec = sch?.color_sec
        var color_accent = sch?.color_accent
        var color_dark = sch?.color_dark
        //activesheet.insertRule(css)
        //console.log(this.hexToRgba(color_main,0.4))
        styleTag += " .btn-main{ background: " + color_main + "; border-color:" + color_main + "; }"
        styleTag += " .bg-main{ background: " + color_main + "; border-color:" + color_main + "; }"
        styleTag += " .bg-sec{ background: " + color_sec + "; border-color:" + color_sec + "; }"
        styleTag += " .bg-maindark{ background: " + color_dark + "; border-color:" + color_dark + "; }"
        styleTag += " .bg-accent{ background: " + color_accent + "; border-color:" + color_accent + "; }"
        styleTag += " .btn-main:focus{background: " + hexToRgba(color_main, 0.9) + ";}"
        styleTag += " .btn-main:hover{background: " + color_main + ";}"
        styleTag += " .txt-main{ color: " + color_main + " !important; }"
        styleTag += " .bb-main{ border-bottom: 1px solid " + color_main + " !important; }"
        styleTag += " .txt-sec{ color: " + color_sec + " !important; }"
        styleTag += " .txt-dark{ color: " + color_dark + " !important; }"
        styleTag += " .txt-accent{ color: " + color_accent + " !important; }"
        styleTag += " .btn-main:hover{ background: " + color_sec + "; border-color:" + color_sec + " !important; }"
        styleTag += " .banner .banner-content{ background: linear-gradient(163deg, " + hexToRgba(color_sec, 0.651) + " 0%, " + hexToRgba(color_accent, 0.541) + " 50%, " + hexToRgba(color_main, 0.726) + " 100%) !important;"
        styleTag += " #sidebar .nuxt-link-exact-active{ background: " + hexToRgba(color_main, 0.3) + " !important;}"
        styleTag += "</style>"
        // console.log(styleTag)
        return styleTag
    })
    function hexToRgba(hex: any, transparent: number) {
        hex = hex.replace('#', '')
        var aRgbHex: any = hex.match(/.{1,2}/g);
        var rgba = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        rgba.push(transparent)
        return "rgba(" + rgba.join(',') + ")";
    }
    return {
        schoolStyle
    }

}