

export const downloadAttachment = async (fileName) => {
    const fileUrl = baseUrl.concat("/v1/media/attatchment/").concat(fileName)


    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
        downloadFile(fileUrl, fileName);
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                        'Application needs access to your storage to download File',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Start downloading
                downloadFile(fileUrl, fileName);
                console.log('Storage Permission Granted.');
            } else {
                // If permission denied then show alert
                Alert.alert('Error', 'Storage Permission Not Granted');
            }
        } catch (err) {
            // To handle permission related exception
            console.log("++++" + err);
        }
    }
};

const downloadFile = (fileUrl: string, fileName: string) => {
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
    file_ext = '.' + file_ext[0];
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
                RootDir +
                '/file_' +
                fileName,
            description: 'Đang tải file',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
        },
    };
    config(options)
        .fetch('GET', FILE_URL)
        .then(res => {

        });
};

const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
        /[^.]+$/.exec(fileUrl) : undefined;
};