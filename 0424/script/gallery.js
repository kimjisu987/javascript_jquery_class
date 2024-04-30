/* gallery.js */

$(document).ready(function(){
  // 1. 변수선언
  let g_img = $('.g_list li a');    // 카테고리
  const g_nav = $('.g_nav ul li a');    // 이미지
  let img_url, title;
  let n = 1;    // 페이지 넘버 왼쪽 숫자
  let total_n = $('.g_list li').length;    // 페이지 넘버 오른쪽 숫자
  // console.log(total_n);    12개 잘 나옴

  // 4. g_nav 클릭시 act서식 적용하고 부모의 다른 형제요소의 자식요소 a에는 act서식을 제거한다.
  g_nav.click(function(){
    $(this).addClass('act').parent().siblings().find('a').removeClass('act');

    // 0. 기존 li 목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // 만약에 this(a태그)의 부모(li)의 인덱스값이 0이면
    if($(this).parent().index()==0){
      // 1. 전체메뉴 클릭시 12장의 목록이 전체 보여진다.
      $('.g_list li').hide();
      $('.g_list li').fadeIn();
    } else if($(this).parent().index()==1){
      // 2. 기획버튼 클릭시 .plan 클래스가 보여진다.
      $('.g_list li').hide();
      $('.plan').fadeIn();
    } else if($(this).parent().index()==2){
      // 3. 설계버튼 클릭시 .design 클래스가 보여진다.
      $('.g_list li').hide();
      $('.design').fadeIn();
    } else if($(this).parent().index()==3){
      // 4. 디자인버튼 클릭시 .ui 클래스가 보여진다.
      $('.g_list li').hide();
      $('.ui').fadeIn();
    } else{
      // 5. 개발버튼 클릭시 .coding 클래스가 보여진다.
      $('.g_list li').hide();
      $('.coding').fadeIn();
    }

    return false;
  });

  // 2. 마우스오버 이벤트
  g_img.hover(function(){   // 마우스 오버시 나타나고 (mouseenter)
    $(this).find('.caption').stop().animate({'bottom':'0px'},200);
  }, function(){    // 마우스가 떠나면 없어진다 (mouseleave)
    $('.caption').stop().animate({'bottom':'-40px'},100);
  });

  // 3. 이미지 클릭시 모달윈도 띄우기
  g_img.click(function(){
    
    // 선택한 a태그 요소의 href 속성값을 변수에 저장한다.
    img_url = $(this).attr('href');
    title = $(this).find('img').attr('alt');

    // 저장된 변수 img_url 값을 출력해본다.
    // console.log(img_url);   img_url 주소값을 가져옴 './images/img1.jpg'
    
    // 클릭했을 때 모달 띄워지면서 페이지넘버 바뀌게 하기
    n = $(this).parent().index()+1;
    console.log(n);

    let modal=`
      <div class="modal">
        <div class="m_inner">
          <h3>${title}</h3>
          <img src="${img_url}" alt="">
          <span><b>${n}</b> / ${total_n}</span>
          <i class="fas fa-times c_btn"></i>
          <i class="fas fa-angle-left"></i>
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    `;

    // body 태그 뒤에 모달 출력하기
    $('body').append(modal);

    // 5. 좌우버튼 클릭시 '이미지', '타이틀제목', '페이지번호' 변경
    
    $('.modal i.fa-angle-left').click(function(){
      //1씩 감소
      if(n==1){
        n=12;
      } else{
        n--;
      }
      // 숫자변경, 타이틀제목변경, 이미지변경 함수 호출
      dataChange(n);
    });
    $('.modal i.fa-angle-right').click(function(){
      //1씩 증가
      if(n==12){
        n=1;
      } else{
        n++;
      }
      dataChange(n);
    });

    function dataChange(i){   // 위의 n값을 넘겨 받아 처리
      // 1. 페이지번호 변경
      $('.modal span').html(`<b>${n}</b> / ${total_n}`)

      // 2. 타이틀제목 caption의 text 값을 가져와서 출력
      // $('.modal h3').text(현재요소의 caption의 텍스트값);
      $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());

      // 3. 이미지 태그에 해당 번호를 삽입하여 이미지 변경하기
      // 변수값을 사용하여 구현
      // <img src="./images/img$(i).jpg" alt="기획">
      // if(i==4||i==9||i==11){
      //   // 만약에 i가 4, 9, 11일 때만 아래 내용을 적용한다.
      //   $('.modal img').attr('src','./images/img'+i+'.png');
      // } else{
      //   $('.modal img').attr('src','./images/img'+i+'.jpg');
      // }

      // 3. 두번째 방법
      // 이미지 주소값을 가져와서 이미지 변경
      let src = $('.g_list li').eq(i-1).find('img').attr('src');
      $('.modal img').attr('src',src);
    }

    // 닫기 버튼 누르면 모달창 숨기기
    $('.modal .c_btn').click(function(){
      $('.modal').hide();
    });

    return false;
  });

});
