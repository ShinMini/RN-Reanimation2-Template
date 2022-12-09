/** @format */

import React, { useRef, useEffect } from 'react'
import { StyledComponent } from 'styled-components'

/**
 * Hook that alerts clicks outside of the passed ref
 */

const Background = styled.div`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';

  width: 600px;
  height: 600px;
  background-color: hsl(265, 3%, 42%);
  opacity: 0.7;
  backdrop-filter: blur(10px);
`
const Popup = styled.div`
  width: 60%;
  height: 60%;
  background-color: hsl(274, 65%, 80%);

  border-bottom: 5px solid #222222;
  border-right: 3px solid #333333;
`
function useOutsideClick(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      // 중요!!, 이 if문이 핵심이에요~
      // 1. 이 if문이 하는 역할을 서술하시오.
      // hint: googling keyword: useRef current attribute && javascript contains
      if (ref.current && !ref.current.contains(event.target)) {
        // 팝업을 종료하는 함수 호출해야해요~
        // 이건 진혜가 해보자구~
        alert('You clicked outside of me!')
      }
    }
    /** popup 클릭시 발생시킬 이벤트 등록
     * @params {handleClickOutside} 바깥 영역 클릭시 이벤트 발생 */
    Background.addEventListener('mousedown', handleClickOutside)
    return () => {
      Background.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

/**
 * component를 받아 팝업 틀 내에 저장할 거에요~
 * @params {props}: {children: popUpContent} children에는 팝업 내에 넣어줄 content가 들어가요~
 */
export default function OutsideClick(props) {
  // 2. 이 useState의 역할은 무엇일까요
  const [activePopup, setActivePopup] = useState(false)
  // 3. useRef가 무엇인지, 이 코드에서 왜 사용했는지?
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef)

  return <Background>{activePopup && <Popup ref={wrapperRef}>{props.children}</Popup>};</Background>
}
