document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();

    const db = firebase.firestore();

    const myPost = db.collection('posts').doc('SocialPost');


    myPosts.onSnapshot(doc => {

        const data = doc.data();
        document.querySelector('#title').innerHTML = data.title();
    })
});

function updatePost() {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('SocialPost');
    const postValue = document.getElementById('postInput').value;
    myPost.update({ title: postValue });
}


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                document.write(`Welcome ${user.displayName}`);
                console.log(user)
            })
            .catch(console.log)

}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const file = files.item(0);

    // Use the actual file's name
    const videoRef = storageRef.child(file.name);

    const task = videoRef.put(file)

    // successful upload
    task.then(snapshot => {
        snapshot.ref.getDownloadURL().then((url) => {
            const videoElement = document.querySelector('#videoUpload');
            videoElement.setAttribute('src', url);
            videoElement.load(); // This is necessary to load and refresh the video element with new source
        });
    });
}


