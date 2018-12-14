import React from 'react';

export default {
  step1: [
    {
      content: (
        <div>
          <h4 className="tour-title">Create your very first song</h4>
        </div>),
      placement: "bottom",
      target: ".add-button",
      disableBeacon: true,
      textAlign: "center",
      locale: { last: "Next", skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          display: "none"
        }
      },
    },
    {
      content: (
        <div>
          <h4>Create your very first song</h4>
        </div>),
      placement: "bottom",
      target: ".cccc",
      disableBeacon: true,
      textAlign: "center",
      locale: { last: "Next" },
      styles: {
        buttonClose: {
          display: "none"
        }
      },
    }
  ],
  step2: [
    {
      content: (
        <div>
          <h4 className="tour-title">Song Name</h4>
          <p>Enter a project name. You can even update the cover of your song</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".specialClass",
      locale: { last: "Next", skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        }
      },
    },
    {
      content:
        "On Clicking Done it will create a new song and redirect you to workspace",
      disableBeacon: true,
      placement: "bottom",
      target: ".submitButton",
      title: "Submit Song",
      locale: { last: "Next" },
    }
  ],
  step3: [
    {
      content: (
        <div>
          <h4 className="tour-title">List Module</h4>
          <p>Click 'Add Module' and and select 'Audio...'</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".add_module",
      locale: { skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          display: "none"
        }
      },
    },
    {
      content: (
        <div>
          <h6> Choose your working module by clicking on audio or lyrics </h6>
        </div>
      ),
      disableBeacon: true,
      placement: "bottom",
      target: ".content-div",
      title: "Select Module",
      styles: {
        buttonClose: {
          display: "none"
        }
      },
    },
  ],
  step4: [
    {
      content: (
        <div>
          <h4 className="tour-title">Select Audio File</h4>
          <p>Choose a file to upload. And click 'Done' to add it to your project.</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".audioButton",
      locale: { last: "Next", skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          display: "none"
        }
      },
    },
    {
      content: (
        <div>
          <h4 className="tour-title">List Module</h4>
          <p>Click 'Add Module' and add the 'Lyrics' module.</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".add_module",
      locale: { last: "Next", skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonBack: {
          display: 'none'
        },
        buttonClose: {
          display: 'none'
        }
      },
    },
    {
      content:
        "You can also record audio and upload it here",
      disableBeacon: true,
      placement: "bottom",
      target: ".recButtton",
      title: "Rec Audio File",
      styles: {
        buttonClose: {
          display: "none"
        }
      },
    },
  ],
  step5: [
    {
      content: (
        <div>
          <h4 className="tour-title">Add a segment.</h4>
          <p>Add a segment.</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".add_segment_button",
      locale: { skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          display: "none"
        }
      },
    },
    {
      content: (
        <div>
          <h4 className="tour-title">Add a segment.</h4>
          <p>Select the type of segment. Also Type in some lyrics. Don't worry you can always change this later.</p>
        </div>),

      disableBeacon: true,
      placement: "bottom",
      target: ".segment-modal",
      locale: { skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          display: 'none'
        }
      },
    },
  ],
  step6: [
    {
      content: (
        <div>
          <h4 className="tour-title">Segment lyrics</h4>
          <p>Select the type of segment. Also Type in some lyrics. Don't worry you can always change this later.</p>
        </div>),
      disableBeacon: true,
      position: "right",
      target: ".segment_item_content_text",
      locale: { skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonClose: {
          disable: 'none'
        }
      },
    },
    {
      content: (
        <div>
          <h4 className="tour-title">Add Collaborator</h4>
          <p>You're on your way. You can also add collaborators on the left. Go invite a friend and start making your next hit!</p>
        </div>),
      disableBeacon: true,
      placement: "bottom",
      target: ".add-collab",
      locale: { last: "Done", skip: "End Tour" },
      styles: {
        options: {
          backgroundColor: '#28f8c7'
        },
        buttonBack: {
          display: 'none'
        },
        buttonClose: {
          display: 'none'
        }
      },
    }
  ]
};
