import { readFile } from '../lib/draft-js-drag-n-drop-upload-plugin/lib/utils/file';

let becomeFailed = false;

export default function mockUpload({ files }, success, failed, progress) {
    function doProgress(percent) {
        files.forEach(({ id }) => progress(id, percent || 1));
        if (percent === 100) {
            // Start reading the file
            files.forEach(({ id, file }) => {
                readFile(file)
                    .then(placholder => placholder.src)
                    .then(src => {
                        if (becomeFailed) {
                            alert('upload error on purpose!');
                            failed([{ id }]);
                        } else {
                            alert('upload finished');
                            success([{ id, src: 'http://i.imgur.com/HYXFLl7.jpg' }]);
                        }
                        becomeFailed = !becomeFailed;
                    });
            });
        } else {
            setTimeout(doProgress, 250, (percent || 0) + 10);
        }
    }

    doProgress();
}
