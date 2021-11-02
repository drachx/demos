import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./SignatureComponent.css";

const SignatureComponent = () => {
    let signatureRef = {};

    const [signatureData, setSignatureData] = useState({
        signatureUrl: null, signatureDataArray: null
    });
    const clear = () => signatureRef.clear();
    const preview = () => {
        let signatureUrl = signatureRef.getTrimmedCanvas().toDataURL("image/png");
        let signatureDataArray = signatureRef.toData();
        setSignatureData({
            signatureUrl: signatureUrl,
            signatureDataArray: signatureDataArray
        });
    };
    const downloadDataArray = () => {
        const signatureDataArray = signatureRef.toData();
        const signatureDataArrayStringify = JSON.stringify(signatureDataArray)

        const element = document.createElement("a");
        const file = new Blob([signatureDataArrayStringify], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "SignatureDataArray.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div className="SignatureContainer">
            <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "SignaturePad" }}
                clearOnResize={false}
                ref={(ref) => { signatureRef = ref }}
            />
            <div className="SignatureButtonsContainer">
                <button className="SignatureButtons" onClick={clear}>Clear</button>
                <button className="SignatureButtons" onClick={preview}>Preview</button>
                <button className="SignatureButtons" onClick={downloadDataArray}>Download</button>
            </div>
            <img className="SignatureImage" src={signatureData.signatureUrl} alt="" />
        </div>
    );
}

export default SignatureComponent;