// 2단 내비게이션, 슬라이드 이미지
$(document).ready(function(){

  // 1. 변수선언
  let gnb = $('.gnb > ul > li > a')   // 메인메뉴
  let slide = $('.slide_wrapper div');    // 움직일 슬라이드 이미지
  let c_btn = $('.lnb li');   // 컨트롤 버튼
  let i = $('.lnb li').index();   // 인덱스 초기값 = 0
  const l_btn = $('.slide .s_btn li:first-child img');
  const r_btn = $('.slide .s_btn li:last-child img');

  
  // 메인메뉴 클릭시 해당 서브만 나오게하기
  gnb.click(function(){
    $(this).next().toggle().parent().siblings().find('.sub').hide();
    return false;
  });
  // 영역 밖 클릭시 서브메뉴 숨기기
  $('html').click(function(){
    $('.sub').hide();
  });

  // 2. 함수로 묶어주기 (다른 곳에서도 적용해야 할 때 편하게 사용하기 위해)
  function fadeInOut(){    // 우측 버튼 (앞으로가기)
    // 슬라이드의 이미지를 모두 페이드아웃하고 (안보이게)
    // slide.fadeOut();
    // eq(i) 인덱스 순서에 맞게 이미지를 페이드인하고 (보이게)
    // slide.eq(i).fadeIn();

    // *문제1 해결* 가끔 하얀바탕이 잘못 나오는 경우가 있어서 siblings를 이용해서 페이드인,아웃을 같이 작동하게 함
    // 슬라이드에서 eq(i) 해당 인덱스번호를 보여지게 하고(fadeIn), 나머지 형제요소(siblings)를 안보이게 해라(fadeOut)
    c_btn.removeClass();
    slide.eq(i).fadeOut();

    // 만약에 인덱스 값이 2라면 = 마지막 이미지이면
    if(i==2){
      i=0;    // 인덱스 값을 0으로 대입해서 첫번째 이미지가 보이게 하고,
    }else{    // 그렇지 않으면 = 마지막 이미지가 아니라면
      i++;    // 1씩 더해지게 해서 다음 이미지가 보이게 한다
    }
    slide.eq(i).fadeIn();
    c_btn.eq(i).addClass('act');
  }

  // 3. 함수로 묶어주기 (다른 곳에서도 적용해야 할 때 편하게 사용하기 위해)
  function fadeInOut2(){    // 좌측 버튼 (뒤로가기)
    // 슬라이드의 이미지를 모두 페이드아웃하고 (안보이게)
    // slide.fadeOut();
    // eq(i) 인덱스 순서에 맞게 이미지를 페이드인하고 (보이게)
    // slide.eq(i).fadeIn();

    // *문제1 해결* 가끔 하얀바탕이 잘못 나오는 경우가 있어서 siblings를 이용해서 페이드인,아웃을 같이 작동하게 함
    // 슬라이드에서 eq(i) 해당 인덱스번호를 보여지게 하고(fadeIn), 나머지 형제요소(siblings)를 안보이게 해라(fadeOut)
    c_btn.removeClass();
    slide.eq(i).fadeOut();

    // 만약에 인덱스 값이 0라면 = 처음 이미지이면
    if(i==0){
      i=2;    // 인덱스 값을 2으로 대입해서 마지막 이미지가 보이게 하고,
    }else{    // 그렇지 않으면 = 처음 이미지가 아니라면
      i--;    // 1씩 빼게 해서 이전 이미지가 보이게 한다
    }
    slide.eq(i).fadeIn();
    c_btn.eq(i).addClass('act');
  }

  // 좌측 버튼 서식
  l_btn.click(function(){
    clearInterval(Timer);   //기존 시간 제거
    fadeInOut2(i);
    console.log(i);
  });

  // 우측 버튼 서식
  r_btn.click(function(){
    clearInterval(Timer);   //기존 시간 제거
    fadeInOut(i);
  });

  // 시간객체를 사용해서 매 3초(3000밀리초)마다 fadeInOut 함수(위의 이미지 바꾸기, 컨트롤버튼 서식 바꾸기)를 반복 호출한다.
  let Timer = setInterval(fadeInOut, 3000);   // 다른 곳에서도 쉽게 쓰기 위해 변수 선언
  // *문제2 해결* 일시정지 상태에서 마우스를 떼도 움직이는 상태가 되어 토글처럼 변수 하나 더 추가함 (재생=1 / 정지=0)
  let j=0;

  // *문제4 해결* 처음에는 재생상태로 인식을 못해서 마우스엔터,리브가 안되는 현상 발생 : 처음에 재생상태로 만들기
  j = 1; // 재생 상태로 설정

  // 2. 컨트롤 버튼 클릭시 인덱스 값 찾기
  c_btn.click(function(){
    clearInterval(Timer);
    i = $(this).index();    // i = 인덱스 초기값 0 이 this 자신의 인덱스값이 되고

    c_btn.removeClass('act');
    c_btn.eq(i).addClass('act');

    slide.fadeOut();//이미지 모두 숨기고
    slide.eq(i).fadeIn(); //해당하는 이미지 나오게
  });

  // 컨트롤 버튼에만 오버시 반경이 작아 lnb에 마우스오버로 함.
  $('.lnb, .slide .s_btn li img').mouseenter(function(){
    if (j==1) {   // 만약에 j==1(재생상태)라면 = 재생중일 때만 작동하게 함
      clearInterval(Timer);   // Timer 함수를 멈춘다
    }        
  });
  $('.lnb, .slide .s_btn li img').mouseleave(function(){
    if (j==1) {   // 만약에 j==1(재생상태)라면 = 재생중일 때만 작동하게 함
      // *문제3 해결* clear를 안 넣으면 Timer 함수가 두 번 적용되어 두 장씩 넘어가는 오류가 생김
      clearInterval(Timer);
      Timer = setInterval(fadeInOut,3000);   // Timer를 다시 작동한다
    }
  });

  // 정지버튼을 클릭했을 때
  $('i.fa-pause').click(function(){
    if($(this).hasClass('fas fa-pause')==true){   // 만약에 아이콘 모양이 정지모양이 맞다면(true)
      clearInterval(Timer);   // 애니메이션을 멈추고(clearInterval)
      j=0     // 토글 정지상태 만들기 (마우스엔터,리브를 위한 역할)
      $(this).attr('class','fas fa-play');    // 버튼 모양이 플레이로 변경되도록 한다(attr)
    } else{   // 정지모양이 아니라면 = 플레이 모양이라면
      $(this).attr('class','fas fa-pause');   // 버튼 모양을 다시 정지모양으로 변경한다. (attr)
      j=1     // 토글 재생상태 만들기 (마우스엔터,리브를 위한 역할)
      Timer = setInterval(fadeInOut,3000);    // 그리고 다시 fadeInOut 함수를 호출한다.
    }
  });

  // 모바일 해상도에서 토글버튼 클릭시 메인메뉴가 아래로 펼쳐지거나 위로 접히게 한다.
  toggle.click(function(){
    $('.gnb').slideToggle();
  });
  
});

// 3. 탭콘텐츠 서식
$(document).ready(function(){
  let t_mnu = $('.tab_con li a');

  //탭메뉴 클릭시 a서식 지우고 내가 클릭한 메뉴만 t_act적용하기
  t_mnu.on( "resize, click", function(e) {
    e.preventDefault();
    let w_size = $(window).width();

    if(w_size >= 1025){ // pc 해상도일 경우
      $(this).addClass('t_act').parent().siblings().find('a').removeClass('t_act');

      $('.cont').hide(); //보이는 콘텐츠 모두숨기고
      $(this).next().show(); //해당 콘텐츠 나오게 한다.

      let t_index = $(this).parent().index();
      console.log(t_index); //0,1,2

      if(t_index==2){
        $('.tab_con_wrap article').height(800);
      }else{
        $('.tab_con_wrap article').height(500);
      }
    }else if(w_size >= 768){ // 태블릿 해상도일 경우
      t_index = $(this).parent().index();

      if(($(this).next().css('display') == "none")){
        $('.tab_con a').removeClass('t_act');
        $(this).addClass('t_act');
        $('.cont').hide(); //보이는 콘텐츠 모두숨기고
        $(this).next().slideToggle(); //해당 콘텐츠 나오게 한다.
        if(t_index==2){
          $('.tab_con li a i').attr('class','fas fa-caret-down');
          $(this).find('i.fas').attr('class','fas fa-caret-up');
          $('.tab_con_wrap article').height(1250);
        }else if(t_index==1){
          $('.tab_con li a i').attr('class','fas fa-caret-down');
          $(this).find('i.fas').attr('class','fas fa-caret-up');
          $('.tab_con_wrap article').height(900);
        }else{
          $('.tab_con li a i').attr('class','fas fa-caret-down');
          $(this).find('i.fas').attr('class','fas fa-caret-up');
          $('.tab_con_wrap article').height(950);
      }
      }else{
        $('.tab_con a').removeClass('t_act');
        $('.cont').hide();
        $('.tab_con li a i').attr('class','fas fa-caret-down');
        $('.tab_con_wrap article').height(750);
      }}else{ // 모바일 해상도일 경우
        t_index = $(this).parent().index();
  
        if(($(this).next().css('display') == "none")){
          $('.tab_con a').removeClass('t_act');
          $(this).addClass('t_act');
          $('.cont').hide(); //보이는 콘텐츠 모두숨기고
          $(this).next().slideToggle(); //해당 콘텐츠 나오게 한다.
          if(t_index==2){
            $('.tab_con li a i').attr('class','fas fa-caret-down');
            $(this).find('i.fas').attr('class','fas fa-caret-up');
            $('.tab_con_wrap article').height(950);
          }else if(t_index==1){
            $('.tab_con li a i').attr('class','fas fa-caret-down');
            $(this).find('i.fas').attr('class','fas fa-caret-up');
            $('.tab_con_wrap article').height(700);
          }else{
            $('.tab_con li a i').attr('class','fas fa-caret-down');
            $(this).find('i.fas').attr('class','fas fa-caret-up');
            $('.tab_con_wrap article').height(800);
        }
        }else{
          $('.tab_con a').removeClass('t_act');
          $('.cont').hide();
          $('.tab_con li a i').attr('class','fas fa-caret-down');
          $('.tab_con_wrap article').height(600);
        }}
    return false;
  });
});

// 5. 이벤트 슬라이드
$(document).ready(function(){
  let e_left_btn = $('.event i.fa-angle-left');
  let e_right_btn = $('.event i.fa-angle-right');
  const eslide = $('.es_wrap');   // 가로로 길게 나열

  // 1번의 앞에 3번이 오도록 위치 잡는다.
  $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
  eslide.css('margin-left','-100%');

  // 움직이는 함수
  function e_move_left(){
    eslide.animate({'margin-left':'-200%'},500,function(){
      $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
      eslide.css('margin-left','-100%');
    });
  }
  function e_move_right(){
    
  }

  // 시간객체 - 3초마다 함수를 호출
  let eTimer = setInterval(e_move_left,3000);

  // 버튼 클릭시 각각 해당 함수를 호출
  e_left_btn.click(function(){
    clearInterval(eTimer);
    e_move_left();
  });
  e_right_btn.click(function(){
    clearInterval(eTimer);
    e_move_right();
  });

  // 좌, 우버튼에 마우스 아웃시 다시 자동재생하도록 함.
  $('.event i.fas').mouseleave(function(){
    eTimer = setInterval(e_move_right,3000);
  });

});

// 모바일 버전 토글 버튼
$(document).ready(function(){
  const toggle = $('#toggle');
  toggle.click(function(){
    $('.gnb').slideToggle();
  });
});

// 모달창
$(document).ready(function(){
  let modal = `
  <div class="modal">
    <div class="m_inner">
      <i class="fas fa-times" id="c_btn"></i>
      <a href="#" title="이벤트배너"><img src="./images/event1.jpg" alt="이벤트배너"></a>
      <input type="checkbox" id="ch">
      <label for="ch">오늘 하루 열지 않음</label>
    </div>
  </div>
  `
  $('body').append(modal);
  let ch = $('#ch');
  if($.cookie('popup')=='none'){   // 쿠키정보가 있다면
    $('.modal').hide();   // 모달창을 숨겨라
  }
  function close_popup(){
    if(ch.is(':checked')){
      $.cookie('popup','none',{expires:1, path:'/'})
      $('.modal').hide();
    } else{
      $('.modal').hide();
    }
  }
  $('#c_btn').click(function(){
    close_popup();
  });
  
});

// 스크롤 탑버튼 서식
$(document).ready(function(){
  let t_btn = $('.t_btn');
  t_btn.hide(); // 탑버튼 숨기기

  $(window).scroll(function(){
    let spos = $(this).scrollTop();
    // 탑버튼 보이게 하고 숨기게 하기
    if(spos>=1100){
      t_btn.fadeIn();
    } else{
      t_btn.fadeOut();
    }
  });  
  t_btn.click(function(){
    $('html, body').animate({scrollTop:'0px'},300);
  });
});