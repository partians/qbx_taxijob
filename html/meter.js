let meterStarted = false;

const updateMeter = (meterData) => {
  $("#total-price").html("$" + meterData.currentFare.toFixed(2));
  $("#total-distance").html(
    (meterData.distanceTraveled).toFixed(2)
  );
};

const resetMeter = () => {
  $("#total-price").html("$0");
  $("#total-distance").html("0.00");
};

const toggleMeter = (enabled) => {
  if (enabled) {
    $(".toggle-meter-btn").html("<p>🟢 Started</p>");
    $(".toggle-meter-btn").css({
      background: "rgba(51, 160, 37, 0.15)",
      boxShadow: "0 0 6px rgba(0, 255, 0, 0.4)"
    });
    $(".toggle-meter-btn p").css({ color: "rgb(51, 160, 37)" });
  } else {
    $(".toggle-meter-btn").html("<p>🔴 Stopped</p>");
    $(".toggle-meter-btn").css({
      background: "rgba(255, 50, 50, 0.15)",
      boxShadow: "0 0 6px rgba(255, 0, 0, 0.3)"
    });
    $(".toggle-meter-btn p").css({ color: "rgb(231, 30, 37)" });
  }
};

const meterToggle = () => {
  if (!meterStarted) {
    $.post(
      `https://${GetParentResourceName()}/enableMeter`,
      JSON.stringify({
        enabled: true,
      })
    );
    toggleMeter(true);
    meterStarted = true;
  } else {
    $.post(
      `https://${GetParentResourceName()}/enableMeter`,
      JSON.stringify({
        enabled: false,
      })
    );
    toggleMeter(false);
    meterStarted = false;
  }
};

const openMeter = (meterData) => {
  $(".container").fadeIn(150);
  $("#total-price-per-100m").html("$" + meterData.defaultPrice.toFixed(2));
};

const closeMeter = () => {
  $(".container").fadeOut(150);
};

$(document).ready(function () {
  window.addEventListener("message", (event) => {
    const eventData = event.data;
    switch (eventData.action) {
      case "openMeter":
        if (eventData.toggle) {
          openMeter(eventData.meterData);
        } else {
          closeMeter();
        }
        break;
      case "toggleMeter":
        meterToggle();
        break;
      case "updateMeter":
        updateMeter(eventData.meterData);
        break;
      case "resetMeter":
        resetMeter();
        break;
      default:
        break;
    }
  });
});