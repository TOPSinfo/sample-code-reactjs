export const validateImageFile = (target) => {
    if (!target.files.length) return { valid: false, errString: 'No file seclected' };
    let file = target.files[0];
    let validImageTypes = ['gif', 'jpeg', 'png', 'jpg'];
    let fileType = file.name.split('.').pop();
    let errString;

    if (validImageTypes.indexOf(fileType) === -1) {
        errString = 'Selected file is not an image';
    } else if (file.size >= 2000000) {
        errString = 'File size too large. Max limit (2MB)';
    }
    if (errString && errString.length) {
        return { valid: false, errString }
    }
    return { valid: true };
}
