// 자바스크립트로 구현하기

// 1. 변수선언
let q = document.querySelectorAll('.qna dt');
// let n = 0;    // 토글스위치처럼 on, off 할 수 있게 기본값 0을 먼저 만들어줌 ▶ 숫자로 하면 오류가 생길 수 있음

// .qna의 dt가 10개가 있으니까 = 여러개니까 반복문 (for로 써도 되지만 간단하게 forEach를 씀)
q.forEach((el) => {   // element 대신 (el) 사용
  el.nextElementSibling.style.display = 'none';
  q[0].nextElementSibling.style.display = 'block';

  el.addEventListener('click',function(){   // querySelector 새로 나온 코드라 화살표함수로 하면 안됨

    //alert('클릭');    클릭이벤트 잘 되는지 확인!
    if(el.nextElementSibling.style.display=='none'){    // 답변이 숨겨진 상태라면
      el.nextElementSibling.style.display='block';    // 답변이 나오게 하고
      this.querySelector('i.fas').classList.add('act');   // 화살표에 act 클래스를 추가한다
    } else{   // 답변이 숨겨진 상태가 아니라면 = 보이고 있다면
      el.nextElementSibling.style.display='none';   // 답변을 숨긴다. ||  nextElementSibling = 엘리먼트의 다음요소
      this.querySelector('i.fas').classList.remove('act');
    }      
  });
});