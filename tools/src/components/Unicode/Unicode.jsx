import React, { useState } from 'react'
import './Unicode.css'
export default function Unicode() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [conversionType, setConversionType] = useState('toUnicode');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleConversionTypeChange = (e) => {
        setConversionType(e.target.value);
        setInputText('');
        setOutputText('');
    };

    const convertToUnicode = () => {
        let output = '';
        for (let char of inputText) {
            const unicode = char.charCodeAt(0).toString(16).toUpperCase();
            const paddedUnicode = unicode.padStart(4, '0');
            output += `\\u${paddedUnicode}`;
        }
        setOutputText(output);
    };

    const convertToCharacter = () => {
        const unicodeArray = inputText.match(/\\u[0-9a-fA-F]{4}/g);
        let output = '';

        if (unicodeArray) {
            for (let unicode of unicodeArray) {
                const char = String.fromCharCode(parseInt(unicode.substr(2), 16));
                output += char;
            }
        } else {
            output = '输入格式不正确，请确保使用\\u格式表示Unicode码点。';
        }
        setOutputText(output);
    };

    const toggleConversionType = () => {
        if (conversionType === 'toUnicode') {
            convertToUnicode();
        } else if (conversionType === 'toCharacter') {
            convertToCharacter();
        }
    };

    const copyOutput = () => {
        // navigator.clipboard.writeText(outputText);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(outputText).catch(err => {
                console.error('Error in copying text: ', err);
                copyOutputFallback();
            });
        } else {
            copyOutputFallback(); 
        }
    };

    const copyOutputFallback = () => {
        const textArea = document.createElement("textarea");
        textArea.value = outputText;
    
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
    
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    
        document.body.removeChild(textArea);
    };
    
    return (
        <div className="unicode-converter">
            <div id="container">
                <h1>字符转Unicode码</h1>
                <label htmlFor="inputText">输入字符串：</label>
                <textarea id="inputText" value={inputText} onChange={handleInputChange}></textarea><br />
                <label htmlFor="outputText">输出结果：</label>
                <textarea id="outputText" value={outputText} readOnly></textarea><br />
                <button onClick={toggleConversionType}>转换</button>
                <button onClick={copyOutput}>复制输出</button><br/>
                <select id="conversionType" value={conversionType} onChange={handleConversionTypeChange}>
                    <option value="toUnicode">字符转Unicode</option>
                    <option value="toCharacter">Unicode转字符</option>
                </select>
            </div>
        </div>
    );
}
