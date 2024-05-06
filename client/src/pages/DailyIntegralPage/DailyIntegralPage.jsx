import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Timer from '../../components/Timer/Timer';

function DailyIntegralPage() {
    // const [showModal, setShowModal] = useState(false)
    return (
        <MathJaxContext>
            <div className="DailyIntegralPage">
                <div class="timer-container">
                    <Timer />
                </div>

                <div className="integral-container">
                    <row className="integral">
                        <p>
                            <MathJax>{"\\[\\int_{2023}^{2025} 2024 \\, dx \\]"}</MathJax>
                        </p>
                    </row>
                </div>
            </div>
        </MathJaxContext>
    );
}

export default DailyIntegralPage;