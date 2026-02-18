import React, { useState, useEffect } from 'react';
import './JudgmentStyles.css';

/**
 * おおだろ判定システム
 * ユーザーの選択に基づき、「判定の重み」を感じさせる演出を経て結果を表示する。
 */
const JudgmentApp = () => {
    // シーン管理: 'main' (初期), 'production' (演出), 'waiting' (待機), 'result' (結果)
    const [scene, setScene] = useState('main');
    // 選択された内容: 'oodaro' | 'not_oodaro' | 'random'
    const [selection, setSelection] = useState(null);
    // 最終的な判定結果 ('oodaro' or 'not_oodaro')
    const [resultType, setResultType] = useState('');
    // 弾幕データ
    const [danmaku, setDanmaku] = useState([]);

    /**
     * ボタン押下時の処理
     */
    const handleSelect = (choice) => {
        setSelection(choice);
        setScene('production');
    };

    /**
     * 弾幕を生成する
     */
    const generateDanmaku = (type) => {
        const texts = type === 'oodaro'
            ? ['これはおおだろ', 'おお', 'おおだろ', '間違いない', 'そうだよ']
            : ['おおじゃないが', 'なにがおおだよ', 'ちがうだろ', '認めない', 'それは違う'];

        const items = [];
        for (let i = 0; i < 40; i++) {
            items.push({
                id: i,
                text: texts[Math.floor(Math.random() * texts.length)],
                top: Math.random() * 90 + '%',
                delay: Math.random() * 2 + 's',
                duration: (Math.random() * 2 + 2) + 's',
                fontSize: (Math.random() * 1.5 + 1) + 'rem'
            });
        }
        setDanmaku(items);
    };

    /**
     * 「判定を表示」ボタン押下時の処理
     */
    const showResult = () => {
        setScene('waiting');

        let finalType = '';
        if (selection === 'oodaro') {
            finalType = 'oodaro';
        } else if (selection === 'not_oodaro') {
            finalType = 'not_oodaro';
        } else {
            finalType = Math.random() > 0.5 ? 'oodaro' : 'not_oodaro';
        }
        setResultType(finalType);

        // 3秒間の待機（溜め）
        setTimeout(() => {
            generateDanmaku(finalType);
            setScene('result');
        }, 3000);
    };

    /**
     * 初期状態に戻す
     */
    const reset = () => {
        setScene('main');
        setSelection(null);
        setResultType('');
        setDanmaku([]);
    };

    return (
        <div className="judgment-container">
            {/* 共通の閉じるボタン */}
            <button className="close-btn" onClick={reset}>×</button>

            {/* メイン画面 */}
            {scene === 'main' && (
                <div className="button-group">
                    <button className="judgment-btn btn-oodaro" onClick={() => handleSelect('oodaro')}>
                        これはおおだろ
                    </button>
                    <button className="judgment-btn btn-random" onClick={() => handleSelect('random')}>
                        ランダム
                    </button>
                    <button className="judgment-btn btn-not-oodaro" onClick={() => handleSelect('not_oodaro')}>
                        おおじゃないが
                    </button>
                </div>
            )}

            {/* 演出・待機・結果（オーバーレイ層） */}
            {scene !== 'main' && (
                <div className="overlay">
                    {scene === 'production' && (
                        <div className="production-layer">
                            <h2 className="production-msg">判定が完了しました</h2>
                            <button className="judgment-btn btn-oodaro" onClick={showResult}>
                                判定を表示
                            </button>
                        </div>
                    )}

                    {scene === 'waiting' && (
                        <div className="waiting-anim">...判定中...</div>
                    )}

                    {scene === 'result' && (
                        <>
                            <div className="danmaku-container">
                                {danmaku.map(item => (
                                    <div
                                        key={item.id}
                                        className="danmaku-item"
                                        style={{
                                            top: item.top,
                                            animationDelay: item.delay,
                                            animationDuration: item.duration,
                                            fontSize: item.fontSize
                                        }}
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                            <div className="result-content">
                                {resultType === 'oodaro' ? (
                                    <>
                                        <div className="result-symbol symbol-o">○</div>
                                        <div className="result-display">これはおおだろ</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="result-symbol symbol-x">×</div>
                                        <div className="result-display">おおじゃないが</div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default JudgmentApp;
