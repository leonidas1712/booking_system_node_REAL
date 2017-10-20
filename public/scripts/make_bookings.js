
$(document).ready(function(){
  console.log($("#bookings-table").data("weekNumber"))
  console.log($("#bookings-table").data("year"));
  //$(this).data('attr') == 'filled') - to identify elements with bookings
  $('td').each(function(){
    if($(this).hasClass("booked") == false){
      //add a click event if it is NOT filled
      $(this).click(function(){
        //sends booking through AJAX
        var day =  $(this).closest('table').find('th').eq(this.cellIndex).text().replace(/\s+/g, '');
        console.log("Day: " + day);
        var time =  $(this).parent().find("td").first().text().replace(/\s+/g, '');
        console.log("Time: " + time);

        var times = time.split("-");
        console.log("Times array: " + times);
        var isoWeek = $("#bookings-table").data("weekNumber");
        console.log("Week num: " + isoWeek);
        console.log("is weeknum an int: " + Number.isInteger(isoWeek));

        var year = $("#bookings-table").data("year");
        console.log("Year: " + year);
        console.log("is year an int: " + Number.isInteger(year));
        console.log('startTime: ' + Time.startAndEndTimes(day,times,isoWeek,year).startDate);
        console.log('endTime: ' + Time.startAndEndTimes(day,times,isoWeek,year).endDate);

        //var name = $(this).text().replace(/\s+/g, '');
        console.log("Date string to format: " + day + "-" + times[0] + "-" + isoWeek + "-" + year);
        var startTime = Time.startAndEndTimes(day,times,isoWeek,year).startDate;
        var endTime = Time.startAndEndTimes(day,times,isoWeek,year).endDate;
        console.log("Created time variables");
        console.log(startTime);
        console.log(endTime);

        //getting the user object so we can make a booking
        $.ajax({
          type:'GET',
          url:'/get_user',
          success:function(response){
            //response object is the user object
            //Use moment to construct the date.
            $.ajax({
              type: 'POST',
              url:'/make_booking',
              data: {
                name:response.name,
                email:response.email,
                day:day,
                timeString:time,
                startTime: startTime,
                endTime: endTime

              },
              success:function(response){
                //do nothing
                console.log(response);
              }
            });
            window.location.reload();
          }
        });
/*
        $.ajax({
          type:'POST',
          url:'/make_booking',
          data: {
            day: day,
            time:time,
            name:name
          },

          success:function(response){
            //do nothing
          }
        })*/

      });
    }
  });


});
