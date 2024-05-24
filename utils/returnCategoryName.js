
export const ReturnCategoryName = (name) => {
    const customString = name.split("%@%");
    return customString?.[1]
}