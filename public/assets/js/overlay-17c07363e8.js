$(document).ready(function(){$(".chat_current_user").click(a=>{$(".overlay").show(),$(".overlay_main").slideDown()}),$(".overlay").click(a=>{$(".overlay").hide(),$(".overlay_main").slideUp()}),$(".overlay_main").click(a=>{a.stopPropagation()})});