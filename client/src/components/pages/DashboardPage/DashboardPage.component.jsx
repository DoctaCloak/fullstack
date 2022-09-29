import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import classnames from 'classnames';
import ThemeContext from 'contexts/theme';
import {refreshUserContactPreferences} from 'store/thunks/user';
import {refreshSelectedDay} from 'store/thunks/dashboard';
import {
  selectUserContactPreferences,
  selectUserContactPreferencesBySelectedDay,
} from 'store/selectors/user';
import {selectSelectedDay} from 'store/selectors/dashboard';
import {convertDateToDayEntryKey, getTimeFromDate} from 'utils/date-utils';
import Calendar from 'components/presentational/Calendar/Calendar.component';

import './DashboardPage.module.scss';

const Dashboard = ({
  refreshSelectedDay,
  refreshUserContactPreferences,
  selectedDay,
  userContactPreferences,
  userContactPreferencesByDay,
}) => {
  useEffect(() => {
    refreshUserContactPreferences();
  }, []);

  const {isLightDisplayMode} = useContext(ThemeContext);

  const className = classnames({
    'dashboard-page': true,
    'dashboard-page--light-mode': isLightDisplayMode,
    'dashboard-page--dark-mode': !isLightDisplayMode,
  });

  const onCalendarChange = date => {
    refreshSelectedDay(date);
  };

  const shouldDisableDate = date => {
    const dayEntryKey = convertDateToDayEntryKey(date);
    const dayDoesNotExist = !userContactPreferences[dayEntryKey];

    return date.getDay() === 0 || date.getDay() === 6 || dayDoesNotExist;
  };

  return (
    <div className={className}>
      {userContactPreferencesByDay.length > 0 &&
        userContactPreferencesByDay.map(contactPreference => {
          const time = getTimeFromDate(contactPreference.date);

          return (
            <div
              className="dashboard-page--preferred-contact-method-wrapper"
              key={contactPreference.date}
            >
              <h2>Prefered Contact Method for {selectedDay}</h2>
              <span>Time: {time}</span>
              <span>
                Preferred Contact Method:{' '}
                {contactPreference.preferredContactMethod}
              </span>
            </div>
          );
        })}
      {userContactPreferencesByDay.length === 0 && (
        <span className="dashboard-page--no-appointments-returned">
          Unfortunately we were not able to detect an ideal time to contact you
          based on our records. Please contact support at 1-800-xxxx. In the
          mean time you can check your email on file for notifications when we
          need to reach you.
        </span>
      )}
      <div className="dashboard-page--calendar">
        <Calendar
          onCalendarChange={onCalendarChange}
          shouldDisableDate={shouldDisableDate}
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  refreshUserContactPreferences: PropTypes.func,
  selectedDay: PropTypes.string,
  userContactPreferencesByDay: PropTypes.func,
  refreshSelectedDay: PropTypes.func,
};

Dashboard.defaultProps = {
  userContactPreferences: {},
  userContactPreferencesByDay: [],
};

const mapStateToProps = createStructuredSelector({
  selectedDay: selectSelectedDay,
  userContactPreferences: selectUserContactPreferences,
  userContactPreferencesByDay: selectUserContactPreferencesBySelectedDay,
});

const mapDispatchToProps = {
  refreshUserContactPreferences,
  refreshSelectedDay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
