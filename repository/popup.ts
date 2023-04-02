import { useLegacyContext } from "./legacyContext";

export function usePopup(context: any = null) {
  const { ctx } = useLegacyContext()
  async function msgBoxConfirm(message: any, title: any = null, okVariant: any = null) {
    if (title == null)
      title = "Please confirm."

    if (okVariant == null)
      okVariant = "primary"

    var data = false;
    return await ctx.value.$bvModal
      .msgBoxConfirm(message, {
        title: title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
  }
  async function msgBoxOk(message: any, title: any = null, okVariant: any = null) {
    if (title == null)
      title = "Confirmation."

    if (okVariant == null)
      okVariant = "primary"

    var data = false;
    return await ctx.value.$bvModal
      .msgBoxOk(message, {
        title: title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: okVariant,
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
      })
  }
  async function toast(message: any, title: any = null, variant: any = null) {
    if (title == null)
      title = "Success."

    if (variant == null)
      variant = "success"

    return await ctx.value.$bvToast.toast(message, {
      title: title,
      variant: variant,
      solid: true,
    })
  }

  return {
    msgBoxConfirm,
    msgBoxOk,
    toast
  }
}