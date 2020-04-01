# 아정당 가입신청서 페이지

## 코드 구조
  - ```/src   /docs /dist 폴더는 사용되지 않는다.```
  - ```/public/* 폴더만 사용된다.```
  
![image](https://user-images.githubusercontent.com/5215827/78158196-e6312000-747b-11ea-943a-08b211e715a9.png)
  - 각 신청서는 반응형 웹페이지로 개발되어 있으며 브라우저의 가로 사이즈에 따라 UI/UX가 변화하게 된다.
  - 신청서의 각 아이템 항목들은 각각의 html 파일 내에 작성되어 있다.
  - common.js 파일은 모든 html 파일에서 공통적으로 사용되며, 각종 데이터의 유효성 검사에 사용 
된다.

## 로컬 테스트 방법
  - Repo를 Clone 받는다.
  - node.js를 설치한다. (버전상관없음)
  - 패키지를 다운받는다.
    - 클론 받은 폴더의 최상위 폴더에서 아래 명령어를 실행한다.
    ```npm install```
  - 로컬 웹서버를 구동한 뒤, 페이지에 접속한다.
    - 아래의 명령어를 실행하면, ```3000```번 포트, ```/public``` 폴더를 root 디렉토리로 로컬 웹서버가 실행된다.
       ```npm start```
      - http://localhost:3000/sk.html   // SK 페이지
      - http://localhost:3000/skt.html    //SK 텔레콤 페이지
      - http://localhost:3000/skb.html    //SK 브로드밴드 페이지
      - http://localhost:3000/kt.html     //KT 페이지
      - http://localhost:3000/lg.html     //LG 페이지
      - http://localhost:3000/hello.html     //LG Hello 페이지
      - http://localhost:3000/skylife.html    //스카이 라이프 페이지
      - http://localhost:3000/rental.html    //스카이 라이프 페이지

## 배포 방법
### 1. 원본 서버 업데이트
   - AWS Console에 접속한다.
     - https://094970881308.signin.aws.amazon.com/console
         - ID: ajung-development
   - S3 서비스에 접속한다.
   - ```ajungweb.co.kr``` 버킷에 접근한다.
     ![image](https://user-images.githubusercontent.com/5215827/78159569-b125cd00-747d-11ea-80bb-422b86468023.png)
   - 업로드 버튼 선택
   - 업데이트 하고자 하는 파일들을 드래그 앤 드롭
       - 로컬 ```/public``` 폴더아래의 수정한 파일들
   - 다음 버튼 선택
   - ```퍼블릭 권한 관리``` - ```이 객체에 퍼블릭 읽기 액세스 권한을 부여함```으로 변경
     ![image](https://user-images.githubusercontent.com/5215827/78159997-4cb73d80-747e-11ea-8cf3-a36199cd4a78.png)
  - 다음 버튼 선택
  - 다음 버튼 선택
  - 업로드 버튼 선택

### 2. CDN Purge (CDN 캐시 갱신)
   - AWS의 CloudFront 서비스로 접속
   - ID가 ```E3N5KY77PX6T57```  인 Distribution 선택 
     ![image](https://user-images.githubusercontent.com/5215827/78160341-c18a7780-747e-11ea-9b89-d7418bd0c6c5.png)
   - ```Invalidations``` 탭 선택
   - ```Create Invalidation``` 버튼 선택
   - 노출된 팝업창의 ```Object Paths``` 항목에 수정한 파일들의 경로를 기입
       - 경로의 최상위 / (root) 는 ```ajungweb.co.kr``` 버킷의 최상위 경로와 같다.
           ```ajungweb.co.kr``` 버킷의 ```/sk.html``` 파일을 수정했을 경우, ```/sk.html```을 기입하면 된다.
       ![image](https://user-images.githubusercontent.com/5215827/78160736-542b1680-747f-11ea-8926-01d718ab799a.png)
   - Invalidate 버튼 선택



