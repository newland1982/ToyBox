const utcDate = localDate => (localDate.getUTCMonth() + 1).toString()
                            + localDate.getUTCDate().toString()
                            + localDate.getUTCFullYear().toString()
                            + localDate.getUTCHours().toString()
                            + localDate.getUTCMinutes().toString()
                            + localDate.getUTCSeconds().toString()
                            + localDate.getUTCMilliseconds().toString();

module.exports = utcDate;
