
export const ReturnCategoryID = (id) => {
    const customString = id.split("%@%");
    return customString?.[0]
}