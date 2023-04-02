export function useUiRepo(ctx: any = null) {
    function emitCancel() {
        ctx.emit('cancel', true)
    }
    function print(){
        window.print()
    }
    return {
        emitCancel,
        print
    }
}