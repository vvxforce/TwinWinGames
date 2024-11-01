export default (function() {
    window.utils = {
        /**
         * @param {Array}
         * @return {Array}
         */
        shuffleArray(array) {
            let shuffledArray = array.slice();
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        }
    }
})()