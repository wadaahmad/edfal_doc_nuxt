export class objectHelper {
    public static copyValue(from: Object, to: Object) {
        Object.entries(from).forEach((val: any, idx: any) => {
            to[idx as keyof typeof to] = val
        })
        return to
    }
}