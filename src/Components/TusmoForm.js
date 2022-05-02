import {useState} from 'react'
import wordList from '../wordList.json';

export default function TusmoForm (){
    const [words, setWords] = useState(wordList.words);
    const [requiredWordLength, setRequiredWordLength] = useState('');
    const [firstLetters, setFirstLetters] = useState('');
    const [lettersToContain, setLettersToContain] = useState('');
    const [lettersToExclude, setLettersToExclude] = useState('');
    const [noResult, setNoResult] = useState(false);
    const [showList, setShowList] = useState(false);

    const submitWord = e => {
        e.preventDefault();

        const filteredWords = words.filter(word => {
            let unaccentWord = unaccent(word);
            const isSameLength = unaccentWord.length === requiredWordLength;
            return isSameLength
                && hasSameFirstLetters(unaccentWord)
                && containsLetters(unaccentWord)
                && doesNotcontainLetters(unaccentWord);
        });

        if (filteredWords.length === 0) {
            setNoResult(true);
        } else {
            setShowList(true);
            setWords(filteredWords);
        }
    }

    const resetForm = () => {
        setWords(wordList.words);
        setRequiredWordLength('');
        setFirstLetters('');
        setLettersToContain('');
        setLettersToExclude('');
        setNoResult(false);
        setShowList(false);
    }

    const doesNotcontainLetters = word => {
        let array = [];
        for(let i=0; i<lettersToExclude.length; i++) {
            array.push(word.includes(lettersToExclude.charAt(i)));
        }
        return array.every(elem => elem === false);
    }

    const containsLetters = word => {
        let array = [];
        for(let i=0; i<lettersToContain.length; i++) {
            array.push(word.includes(lettersToContain.charAt(i)));
        }
        return array.every(elem => elem === true);
    }

    const hasSameFirstLetters = word => {
        let array = [];
        for(let i=0; i<firstLetters.length; i++) {
            array.push(word.charAt(i).toLowerCase() === firstLetters.charAt(i).toLowerCase());
        }
        return array.every(elem => elem === true);
    }

    const accentsCharmap = {
        a: /[àâäÀÂÄ]/g,
        c: /[çÇ]/g,
        e: /[éèêëÉÈÊË]/g,
        i: /[îïÎÏ]/g,
        o: /[öôÖÔ]/g,
        ss: /[ß]/g,
        u: /[ûùüÛÙÜ]/g,
    };

    const unaccent = str => {
        if (!str.normalize) {
            let unaccentedStr = str;
            Object.keys(accentsCharmap).forEach(chr => {
                unaccentedStr = unaccentedStr.replace(accentsCharmap[chr], chr);
            });
            return unaccentedStr;
        }
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
    };

    const onChangeWordLength = e => {
        setRequiredWordLength(parseInt(e.target.value));
    }

    const onChangeFirstLetters = e => {
        setFirstLetters(e.target.value);
    }

    const onChangeLetterToContain = e => {
        setLettersToContain(e.target.value);
    }

    const onChangeLetterToExclude = e => {
        setLettersToExclude(e.target.value);
    }

    return (
        <div className="m-auto px-4 col-sm-6 col-xs-12">
            <form onSubmit={e => submitWord(e)} className="mb-3">
                <label htmlFor="wordLength" className="form-label mt-3 white">Longueur du mot</label>
                <input
                    value={requiredWordLength}
                    onChange={e => onChangeWordLength(e)}
                    type="number"
                    className="form-control"
                    id="wordLength"/>
                <label htmlFor="firstLetters" className="form-label mt-3">Début du mot</label>
                <input
                    value={firstLetters}
                    onChange={e => onChangeFirstLetters(e)}
                    type="text"
                    className="form-control"
                    id="firstLetters"/>
                <label htmlFor="lettersToContain" className="form-label mt-3 white">Lettres à contenir</label>
                <input
                    value={lettersToContain}
                    onChange={e => onChangeLetterToContain(e)}
                    type="text"
                    className="form-control"
                    id="lettersToContain"/>
                <label htmlFor="lettersToExclude" className="form-label mt-3 white">Lettres à exclure</label>
                <input
                    value={lettersToExclude}
                    onChange={e => onChangeLetterToExclude(e)}
                    type="text"
                    className="form-control"
                    id="lettersToExclude"/>
                <button className="bg-warning text-white mt-2 btn d-block m-auto">Montre moi</button>
            </form>
            <button onClick={resetForm} className="bg-danger text-white mt-2 btn d-block m-auto">Reset la liste</button>

            {showList && <>
                {noResult ? <p>Aucun résultat</p> : (
                    <ul>
                        {
                            words.map((word, index) => <li key={index}>{word}</li>)
                        }
                    </ul>
                )}
            </>}
        </div>
    )
}