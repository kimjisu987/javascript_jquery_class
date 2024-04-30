$(document).ready(function(){

      //1. 변수선언
      let gnb = $('.gnb > ul > li > a');//메인메뉴
      let i = 0; //인덱스값
      let slide = $('.slide_wrapper div');
      let c_btn = $('.lnb li');
      const l_btn = $('.slide .s_btn li:first-child img');
      const r_btn = $('.slide .s_btn li:last-child img');
      let t_mnu = $('.tab_con li a');
      const toggle = $('#toggle');

      // 모바일 해상도에서 토글버튼 클릭시 메인메뉴가 아래로 펼쳐지거나 위로 접히게 한다.
      toggle.click(function(){
        $('.gnb').slideToggle();
      });

      //탭메뉴 클릭시 a서식 지우고 내가 클릭한 메뉴만 t_act적용하기
      t_mnu.click(function(){
      
        let w_size = $(window).width();

        if(w_size >= 768){ //pc, tablet 해상도일 경우 적용되는 기능
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
        }else{ //화면의 너비가 767보다 작으면 모바일 화면

          //탭메뉴 클릭시 아이콘폰트 방향이 변경되어야
          $(this).find('i.fas').attr('class','fas fa-angle-up').parent().parent().siblings().find('i.fas').attr('class','fas fa-angle-down');

          $(this).addClass('t_act').parent().siblings().find('a').removeClass('t_act');

          $(this).next().slideDown().parent().siblings().find('div').slideUp();

          if(t_index==2){
            $('.tab_con_wrap article').height(800);
          }else{
            $('.tab_con_wrap article').height(700);
          }
        }

        return false;
      });

      // 메인메뉴 클릭시 해당 서브만 나오게하기
      gnb.click(function(){
        //내가 선택한 a요소의 sub메뉴 나오게 하고 부모의 형제요소들의 자손인 .sub는 숨긴다.
        $(this).next().toggle().parent().siblings().find('.sub').hide();
        return false;
      });

      // header영역 밖에 클릭시 서브메뉴 숨기기
      $('body').click(function(){
        $('.sub').hide();
      });
      
      //2. 이미지가 변하는 함수
      function fadeInOut(){
        c_btn.removeClass('act'); //콘트롤 버튼에 서식 모두제거하고
        slide.eq(i).fadeOut(); //보이는 이미지전부 숨기고

        if(i==2){ //만약에 인덱스 값이 2라면 = 마지막 이미지라면
          i=0; //인덱스값을 1로 대입하고
        }else{ //그렇지 않으면
          i++; //1씩 더하여 다음 이미지가 나오게한다.
        }
        slide.eq(i).fadeIn(); //인덱스 번호에 해당하는 n번째 이미지가 나옴
        c_btn.eq(i).addClass('act'); //인덱스 번호에 해당하는 콘트롤버튼에 서식 적용
      }

      function fadeInOut2(){ //좌측버튼
        c_btn.removeClass('act'); //콘트롤 버튼에 서식 모두제거하고
        slide.eq(i).fadeOut(); //보이는 이미지전부 숨기고

        if(i==0){ //만약에 인덱스 값이 0라면 = 처음이미지라면
          i=2; //인덱스값을 2로 대입하고
        }else{ //그렇지 않으면
          i--; //1씩 빼서 이전 이미지가 나오게한다.
        }

        slide.eq(i).fadeIn(); //인덱스 번호에 해당하는 n번째 이미지가 나옴
        c_btn.eq(i).addClass('act'); //인덱스 번호에 해당하는 콘트롤버튼에 서식 적용
      }

      //좌, 우버튼 클릭시 각각 해당 함수 호출하여 이미지 변경
      l_btn.click(function(){
        clearInterval(Timer); //기존 시간을 제거
        fadeInOut2(); //해당 방향으로 움직이게
      });

      r_btn.click(function(){
        clearInterval(Timer);//기존 시간을 제거
        fadeInOut(); //해당 방향으로 움직이게
      });

      //3. 매 3초마다 반복실행 => Timer
      let Timer = setInterval(fadeInOut, 3000);

      //콘트롤 버튼 클릭시 해당 이미지 나오게하기
      $('.slide .lnb li').click(function(){
        clearInterval(Timer);

        i = $(this).index();
        console.log(i); //0,1,2 확인

        c_btn.removeClass('act');
        c_btn.eq(i).addClass('act');

        slide.fadeOut();//이미지 모두 숨기고
        slide.eq(i).fadeIn(); //해당하는 이미지 나오게
      });

      //좌, 우, 콘트롤 버튼에 마우스 아웃시 자동으로 플레이 되도록 한다.
      $('.slide .s_btn li img, .slide .lnb li').mouseleave(function(){
        clearInterval(Timer);
        Timer = setInterval(fadeInOut, 3000);
      });

      // 이벤트 슬라이드
      let e_left_btn = $('.event i.fa-angle-left');
      let e_right_btn = $('.event i.fa-angle-right');
      const eslide = $('.es_wrap');

      //1번의 앞에 3번이 오도록 위치 잡는다.
      $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

      eslide.css('margin-left','-100%');

      //움직이는 함수
      function e_move_left(){
        eslide.animate({'margin-left':'-200%'},500, function(){
          $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
          eslide.css('margin-left','-100%');
        });
      }

      function e_move_right(){
        
      }

      //시간객체 - 3초마다 함수를 호출
      let eTimer = setInterval(e_move_left,3000);

      //버튼 클릭시 각각 해당 함수를 호출
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