const certificateUtil = {
  test: (action, row) => {
    const activityType = row.program?.activity?.activity_type;
    const testAdvisor = row.advisors?.length;
    const testParticipantActive = row.participants?.filter(
      (row) => row.participant_active == 1
    );
    const testProgram = row.program?.confirm;
    const testAwardLevelName = row.competition_result?.award_level?.award_level_name;
    if (action == 'advisor') {
      if (testProgram && testAdvisor && testAwardLevelName) {
        return true;
      }
    } else if (action == 'participant') {
      if (activityType == 1) {
        if (testProgram && testParticipantActive?.length && testAwardLevelName) {
          return true;
        }
      } else if (activityType == 2) {
        if (testProgram && testParticipantActive?.length && testAwardLevelName) {
          return true;
        }
      } else {
        return false;
      }
    }
  },
  justifyParticipantFont: (text) => {
    var name = text?.participants?.filter((row) => row.selected == true);
    var nameLength = name?.length;
    var newName = '';
    // set certificate name
    if (nameLength == 1) {
      return { count: 1, name: name[0]?.participant_name };
    } else if (nameLength > 1) {
      // check new line and pattern style
      // pattern 1-4
      if (nameLength <= 4) {
        var newLine = nameLength == 4 ? ['1'] : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.participant_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.participant_name} \n`;
          } else {
            newName += `${name[i]?.participant_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
      // pattern 5-8
      if (nameLength <= 8) {
        var newLine =
          nameLength == 5
            ? ['2']
            : nameLength == 6
            ? ['2']
            : nameLength == 7
            ? ['3']
            : nameLength == 8
            ? ['3']
            : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.participant_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.participant_name} \n`;
          } else {
            newName += `${name[i]?.participant_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
      // pattern 9-12
      if (nameLength <= 12) {
        var newLine =
          nameLength == 9
            ? ['3', '7']
            : nameLength == 10
            ? ['3', '7']
            : nameLength == 11
            ? ['3', '7']
            : nameLength == 12
            ? ['3', '7']
            : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.participant_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.participant_name} \n`;
          } else {
            newName += `${name[i]?.participant_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
    }
    return { count: 0, name: '' };
  },
  justifyAdvisorFont: (text) => {
    var name = text?.advisors?.filter((row) => row.selected == true);
    var nameLength = name?.length;
    var newName = '';
    // set certificate name
    if (nameLength == 1) {
      return { count: 1, name: name[0]?.advisor_name };
    } else if (nameLength > 1) {
      // check new line and pattern style
      // pattern 1-4
      if (nameLength <= 4) {
        var newLine = nameLength == 4 ? ['1'] : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.advisor_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.advisor_name} \n`;
          } else {
            newName += `${name[i]?.advisor_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
      // pattern 5-8
      if (nameLength <= 8) {
        var newLine =
          nameLength == 5
            ? ['2']
            : nameLength == 6
            ? ['2']
            : nameLength == 7
            ? ['3']
            : nameLength == 8
            ? ['3']
            : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.advisor_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.advisor_name} \n`;
          } else {
            newName += `${name[i]?.advisor_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
      // pattern 9-12
      if (nameLength <= 12) {
        var newLine =
          nameLength == 9
            ? ['3', '7']
            : nameLength == 10
            ? ['3', '7']
            : nameLength == 11
            ? ['3', '7']
            : nameLength == 12
            ? ['3', '7']
            : [];
        for (const i in name) {
          if (i == nameLength - 1) {
            newName += `และ${name[i]?.advisor_name}`;
          } else if (newLine.includes(i)) {
            newName += `${name[i]?.advisor_name} \n`;
          } else {
            newName += `${name[i]?.advisor_name} `;
          }
        }
        return { count: nameLength, name: newName };
      }
    }
    return { count: 0, name: '' };
  },
};

export default certificateUtil;
