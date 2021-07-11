import React, {useCallback, useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {getCards, setGetRequestParams, TSetRequestParams} from "../f6-cards/cards_reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectCards, selectPackName} from "../../n2-bll/selectors/cards_selectors";
import Modal from "../../n4-common/components/c6-Modals/Modal";
import SuperButton from "../../n4-common/components/Elements/e1-SuperButton/SuperButton";
import SuperRadio from "../../n4-common/components/Elements/e5-SuperRadio/SuperRadio";
import s from './Learn.module.css'
import {PATH} from "../../n1-app/a2-routes/Routes";
import {Preloader} from "../../n4-common/components/c2-Preloader/Preloader";
import {selectIsFetching} from "../../n2-bll/selectors/app_selectors";

const Learn: React.FC = () => {
    const [shownAnswer, setShowAnswer] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    const packName = useSelector(selectPackName)
    const isFetching = useSelector(selectIsFetching)
    const cards = useSelector(selectCards)

    const dispatch = useDispatch()
    const packIdParam = useParams<{ packId: string }>()

    const setGetRequestParamsCallback = useCallback((requestParams: TSetRequestParams) => {
        dispatch(setGetRequestParams(requestParams))
        dispatch(getCards())
    }, [dispatch])

    useEffect(() => {
        if (packIdParam.packId !== ':packId') setGetRequestParamsCallback({cardsPack_id: packIdParam.packId})
    }, [packIdParam, setGetRequestParamsCallback])

    if(!isOpen) return <Redirect to={PATH.CARD_DECKS}/>

    return (
        <div>
            {isFetching && <Preloader left={'45%'} top={'45%'} size={'100px'}/>}
            <Modal title={`Learn ${packName ? packName : '"no name"'}`} isOpen={isOpen} close={() => null}>
                <div className={s.question}><span>Question:</span>"why are you learning React?"</div>
                {shownAnswer && <><div className={s.answer}><span>Answer:</span>"because it's awesome"</div>
                <div className={s.radio__block}>
                    <h2>Rate yourself:</h2>
                    <SuperRadio options={[' Did not know', ' Forgot', ' A lot of trough', ' Confused', ' Knew the answer']}
                                 />
                </div>
                </>}
                <div>
                    <SuperButton onClick={() => setIsOpen(false)} width={"100px"}>
                        Cancel
                    </SuperButton>
                    {!shownAnswer && <SuperButton onClick={() => setShowAnswer(true)} width={"150px"}>
                        Show answer
                    </SuperButton>}
                    {shownAnswer && <SuperButton width={"150px"}>
                        next
                    </SuperButton>}
                </div>
            </Modal>
        </div>
    );
};

export default Learn;
