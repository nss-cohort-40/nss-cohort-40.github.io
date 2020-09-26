$('.navbar-collapse').click(function(){
    $(".navbar-collapse").collapse('hide');
});

$('body').click(function(){
  $(".navbar-collapse").collapse('hide');
});

// initialize the tool-tip plugin for Bootstrap4
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$.ajax({
  url: "data/cohort.json",
})
  .done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

function cohortMembers(list) {
  let data = list.cohort;
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`;
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != null) {
      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="m-2 fas fa-globe fa-2x contactIcons"></i>
      </a>`;
    }
    //if student is marked as hired display a the hired banner
    if (item.hired === true) {
      studentContact += `<div class="ribbon ribbon-top-right"><span>Hired</span></div>`;
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {
      studentContact += `<a href=${item.github} target="_blank">
      <i class="m-2 fab fa-github fa-2x contactIcons"></i>
      </a>`;
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {
      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="m-2 fab fa-linkedin fa-2x contactIcons"></i>
      </a>`;
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {
      studentContact += `<a href=mailto:${item.email}>
              <i class="m-2 fas fa-envelope fa-2x contactIcons"></i>
            </a>`;
    }
    studentContact += `</div>`;

    let modalClose = `
            <center>
              <button type="button" data-dismiss="modal" class="backButton btn btn-outline-primary title-font bottom" aria-label="Close">
              Back
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>`;

    let studentInfo = `<div class="col-md-3 cohortMems">
          <img class="card-img-top" src="images/classmates/${item.proImg}" alt="${item.firstName} ${item.lastName}" data-toggle="modal" data-target="#cohortMember${item.id}" style="cursor:pointer;">
          <div class="card-body">
            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`;
    //if student didn't provide a reelthemin quote then nothing is displayed
    // if (item.reelThemIn != null) {
    //   studentInfo += `<p class="card-text">${item.reelThemIn}</p>`
    // }
    studentInfo += studentContact;

    //if a student doesn't have a bio, then the learn more button doesn't appear and a modal isn't created
    if (item.bio != null) {
      studentInfo += `
          <center>
            <button type="button" class="btn btn-outline-primary title-font bottom btn-modal-trigger" data-toggle="modal" data-target="#cohortMember${item.id}">
              Learn More!
            </button>
          </center>
          <center>`;
      if (item.capUrl) {
        studentInfo += `
            <button type="button" class="btn btn-outline-primary title-font bottom btn-modal-trigger" data-toggle="modal" data-target="#studentCapstone${item.id}">
            Capstone Demo
              </button>
            </center>
          </div>
        </div>`;
      }
      //modal info
      studentInfo += `
        <div class="modal fade" id="cohortMember${item.id}" tabindex="-1" role="dialog" aria-labelledby="cohortMember${item.id}Label" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title title-font" id="cohortMember${item.id}Label">${item.firstName} ${item.lastName}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body align-items-center">
              <div class="media d-flex flex-wrap align-items-center">
                <img src="images/classmates/${item.funImg}" alt="${item.firstName} ${item.lastName} fun"/>
                <div class="media-body m-3">
                  <h5 class="text-center media-object">${item.reelThemIn}</h5>
                  ${item.bio}
                </div>
              </div>`;
      studentInfo += studentContact;
      studentInfo += modalClose
      // capstone vid modal info
      studentInfo +=`
        <div class="modal fade" id="studentCapstone${item.id}" tabindex="-1" role="dialog" aria-labelledby="studentCapstone${item.id}Label" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title title-font" id="studentCapstone${item.id}Label">${item.firstName} ${item.lastName}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body align-items-center">
              <div class="capstone-container media d-flex flex-wrap align-items-center">
                <iframe src="https://www.youtube.com/embed/${item.capUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
          </div>
                `;
      studentInfo += modalClose;
    } else {
      studentInfo += `
        </div>
      </div>
        `;
    }
    document.getElementById("cohort").innerHTML += studentInfo;
    // Make sure videos stop playing if user clicks away from modal
    $('.modal').on('hide.bs.modal', function() {
      var memory = $(this).html();
      $(this).html(memory);
    });
  });
}

$.ajax({
  url: "data/techs.json",
})
  .done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById(
      "techs"
    ).innerHTML += `<div class="m-4">
         <center ><a href="${item.link}" target="_blank"><img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
}
