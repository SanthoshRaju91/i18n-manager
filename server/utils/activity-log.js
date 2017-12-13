import FileDB from './FileDB';
import logger from './logger';
import { log } from 'util';

const ActivityInstance = new FileDB('activity.json');

/**
 * Function to log the activity performed
 * @method logActivity
 * @param {Object} activity 
 */
export function logActivity(activity) {
    try {
        let activities = ActivityInstance.getData() || [];
        activities = [activity, ...activities];
        ActivityInstance.writeData(activities);
        return true;
    } catch(err) {
        logger.error(`Error in writing activity ${err}`);
        return false;
    }
}

/**
 * Function to get the list of activities performed
 * @method getActivities
*/
export function getActivities() {
    let activities = ActivityInstance.getData();
    return activities;
}

/**
 * Function to return the last activity performed
 * @method getLastActivity
*/
export function getLastActivity() {
    let activities = ActivityInstance.getData();
    let recent = activities[0];
    return recent;
}