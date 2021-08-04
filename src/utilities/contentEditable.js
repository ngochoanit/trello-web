//select all text on input
export const selectAllInlineText = (e) => {

    e.target.select()
}
//handelevent on key press === Enter
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
        e.target.blur()

    }
}