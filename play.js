$(document).ready(function(){$('#rstart, #continue').click(function(){if($("form")[0].checkValidity()){$.ajax({type:"POST",url:"play_reset.php",data:{tr:(this.id=='rstart')?$('#selRound').val():'con',pw:$('#pw').val(),u:$('#selRound').attr('data-u')},async:false,success:function(data){data=JSON.parse(data);if(data.mode=="true"){window.location.href=$('#selRound').attr('data-u');}
else{$("#otext").html(data.msg);}}});return false;}else console.log("invalid form");});});function isPowerOfTwo(a){if(a<=0){return false;}
while(a>1){if(a%2!==0){return false;}
a/=2;}
return true;}
$.cround=function(co,round){var gg=(!isPowerOfTwo(round))?' <b style="color:red">일부 후보는 부전승으로 올라갑니다.</b>':'';$('#rtext').html('총 '+co+'명의 후보 중 무작위 '+round+'명이 대결합니다.'+gg);};$('#selRound').change(function(){$.cround($(this).attr("name"),$(this).val());});$('#list').click(function(){window.location.href="https://www.piku.co.kr/";});$('.cancel').click(function(){window.location.href="https://www.piku.co.kr/";});$('#share').click(function(){$('#shareurl').select();try{var successful=document.execCommand('copy');alert("주소가 복사되었습니다. 원하는 곳에 붙여넣기 해주세요.");}
catch(err){alert("실패하였습니다.");}});$('#wleft').one("click",function(){$.Animate('wright','fadeOutRightBig');$('#wleft').css({backgroundPosition:'center center'});$('#wleft').css({'text-align':'center'});$('#versus').hide();$('#wrightn').hide();$('#lbtn').hide();$('#lu1').css('visibility','hidden');$('#ru1').css('visibility','hidden');$('#wleftn').css({'text-align':'center','padding-right':'0'});$('#wleft').animate({width:'100%',maxWidth:'100%'},500,function(){$.Movepg($('#wleft').attr("name"),$('#wright').attr("name"));});});$('#wright').one("click",function(){if($('#wright').attr("name")!='')
{$.Animate('wleft','fadeOutLeftBig');$('#wright').css({backgroundPosition:'center center'});$('#wright').css({'text-align':'center'});$('#versus').hide();$('#wleftn').hide();$('#rbtn').hide();$('#lu1').css('visibility','hidden');$('#ru1').css('visibility','hidden');$('#wrightn').css({'text-align':'center','padding-left':'0'});$('#wright').animate({left:'0',width:'100%',maxWidth:'100%'},500,function(){$.Movepg($('#wright').attr("name"),$('#wleft').attr("name"));});}});$('#savecom').click(function(){if($('#n').val()=='')
{$('#n').focus();return false;}
if($('#c').val()=='')
{$('#c').focus();return false;}
$.ajax({type:"POST",url:"https://www.piku.co.kr/w/play_save_com.php",data:$("#form1").serialize(),async:false,success:function(data){window.location.reload();}});});$.Animate=function(wid,ani){$('#'+wid).removeAttr('class').attr('class','');$('#'+wid).addClass('animated');$('#'+wid).addClass(ani);};$('#twitchurl').on('input',function(){$('#twitchcon').prop('checked',false);});$('#afreecatvurl').on('input',function(){$('#afreecatvcon').prop('checked',false);});$('#chzzkurl').on('input',function(){$('#chzzkcon').prop('checked',false);});var arr1=new Array();var arr2=new Array();var client;function twitch()
{client=new tmi.Client({connection:{reconnect:true},options:{debug:true},channels:[$('#twitchurl').val()]});if($('#twitchcon').is(':checked'))
{if($('#twitchurl').val()=="")
{alert("방송 주소 입력 후 시도하세요");$('#twitchcon').prop('checked',false);}
else
{client.connect();client.on('message',async(channel,context,message)=>{if($('#twitchcon').is(':checked')&&channel=='#'+$('#twitchurl').val())
{if(message.startsWith('!1'))
{if(arr2.indexOf(context.username)>=0)
{arr2.splice(arr2.indexOf(context.username),1);}
if(arr1.indexOf(context.username)<0)
{arr1.push(context.username);}
if($('#twitchchat').is(':checked')&&message.startsWith('!1 ')&&message.length>3)
{$("#l2").text(message.substr(3));}}
if(message.startsWith('!2'))
{if(arr1.indexOf(context.username)>=0)
{arr1.splice(arr1.indexOf(context.username),1);}
if(arr2.indexOf(context.username)<0)
{arr2.push(context.username);}
if($('#twitchchat').is(':checked')&&message.startsWith('!2 ')&&message.length>3)
{$("#r2").text(message.substr(3));}}
$("#l11").text(arr1.length);$("#r11").text(arr2.length);$("#l12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#r12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#lu11").text(arr1.length);$("#ru11").text(arr2.length);$("#lu12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#ru12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");}});}}
else
{client.disconnect();}}
var ws;function afreecatv()
{if($('#afreecatvcon').is(':checked'))
{if($('#afreecatvurl').val()=="")
{alert("방송 주소 입력 후 시도하세요");$('#afreecatvcon').prop('checked',false);}
else
{ws=new WebSocket('wss://ws.piku.co.kr:8443/'+$('#afreecatvurl').val());ws.onmessage=function(event){let pData=JSON.parse(event.data);if($('#afreecatvcon').is(':checked')&&pData.bjid==$('#afreecatvurl').val())
{if(pData.msg.startsWith('!1'))
{if(arr2.indexOf(pData.userid)>=0)
{arr2.splice(arr2.indexOf(pData.userid),1);}
if(arr1.indexOf(pData.userid)<0)
{arr1.push(pData.userid);}
if($('#twitchchat').is(':checked')&&pData.msg.startsWith('!1 ')&&pData.msg.length>3)
{$("#l2").text(pData.msg.substr(3));}}
if(pData.msg.startsWith('!2'))
{if(arr1.indexOf(pData.userid)>=0)
{arr1.splice(arr1.indexOf(pData.userid),1);}
if(arr2.indexOf(pData.userid)<0)
{arr2.push(pData.userid);}
if($('#twitchchat').is(':checked')&&pData.msg.startsWith('!2 ')&&pData.msg.length>3)
{$("#r2").text(pData.msg.substr(3));}}
$("#l11").text(arr1.length);$("#r11").text(arr2.length);$("#l12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#r12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#lu11").text(arr1.length);$("#ru11").text(arr2.length);$("#lu12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#ru12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");}};}}
else
{if(ws&&ws.readyState===WebSocket.OPEN){ws.close();}
ws=null;}}
var ws2;function chzzk()
{if($('#chzzkcon').is(':checked'))
{if($('#chzzkurl').val()=="")
{alert("방송 주소 입력 후 시도하세요");$('#chzzkcon').prop('checked',false);}
else
{ws2=new WebSocket('wss://ws.piku.co.kr:8443/'+$('#chzzkurl').val());ws2.onmessage=function(event){let pData=JSON.parse(event.data);if($('#chzzkcon').is(':checked')&&pData.bjid==$('#chzzkurl').val())
{if(pData.msg.startsWith('!1'))
{if(arr2.indexOf(pData.userid)>=0)
{arr2.splice(arr2.indexOf(pData.userid),1);}
if(arr1.indexOf(pData.userid)<0)
{arr1.push(pData.userid);}
if($('#twitchchat').is(':checked')&&pData.msg.startsWith('!1 ')&&pData.msg.length>3)
{$("#l2").text(pData.msg.substr(3));}}
if(pData.msg.startsWith('!2'))
{if(arr1.indexOf(pData.userid)>=0)
{arr1.splice(arr1.indexOf(pData.userid),1);}
if(arr2.indexOf(pData.userid)<0)
{arr2.push(pData.userid);}
if($('#twitchchat').is(':checked')&&pData.msg.startsWith('!2 ')&&pData.msg.length>3)
{$("#r2").text(pData.msg.substr(3));}}
$("#l11").text(arr1.length);$("#r11").text(arr2.length);$("#l12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#r12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#lu11").text(arr1.length);$("#ru11").text(arr2.length);$("#lu12").text((arr1.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");$("#ru12").text((arr2.length/(arr1.length+arr2.length)*100).toFixed(1)+"%");}};}}
else
{if(ws2&&ws2.readyState===WebSocket.OPEN){ws2.close();}
ws2=null;}}
$('#twitchcon').change(function(){twitch();});$('#afreecatvcon').change(function(){afreecatv();});$('#chzzkcon').change(function(){chzzk();});function voteview()
{$("#l1").css('visibility','hidden');$("#r1").css('visibility','hidden');$("#lu1").css('visibility','hidden');$("#ru1").css('visibility','hidden');if($('#twitchvote').is(':checked'))
{var selectedValue=$('input[name="vote_pos"]:checked').val();if(selectedValue==='bottom'){$("#l1").css('visibility','visible');;$("#r1").css('visibility','visible');}else if(selectedValue==='top'){$("#lu1").css('visibility','visible');$("#ru1").css('visibility','visible');}}}
$('#twitchvote').change(function(){voteview();});$('#twitchchat').change(function(){if(!$('#twitchchat').is(':checked'))
{$("#l2").html('<i class="fa fa-check"></i> 선 택');$("#r2").html('<i class="fa fa-check"></i> 선 택');}});$('.tc').change(function(){$.twitch_save();});$('#lbtn,#rbtn').mouseover(function(){var selectedValue=$('input[name="vote_pos"]:checked').val();if(selectedValue==='bottom'){$("#l1").css('visibility','visible');$("#r1").css('visibility','visible');}else if(selectedValue==='top'){$("#lu1").css('visibility','visible');$("#ru1").css('visibility','visible');}});$('#lbtn,#rbtn').mouseleave(function(){if(!$('#twitchvote').is(':checked'))
{$("#l1").css('visibility','hidden');$("#r1").css('visibility','hidden');$("#lu1").css('visibility','hidden');$("#ru1").css('visibility','hidden');}});$('input[name="vote_pos"]').change(function(){var selectedValue=$(this).val();if(selectedValue==='bottom'){$("#lu1").css('visibility','hidden');$("#ru1").css('visibility','hidden');$("#l1").css('visibility','visible');$("#r1").css('visibility','visible');}else if(selectedValue==='top'){$("#lu1").css('visibility','visible');$("#ru1").css('visibility','visible');$("#l1").css('visibility','hidden');$("#r1").css('visibility','hidden');}});