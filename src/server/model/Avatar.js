/**
 * Avatar
 *
 * @param {Player} player
 */
function Avatar(player)
{
    BaseAvatar.call(this, player);

    this.game = null;
    this.body = new Body(this.head, this.radius, this);
}

Avatar.prototype = Object.create(BaseAvatar.prototype);

/**
 * Update
 *
 * @param {Number} step
 */
Avatar.prototype.update = function(step)
{
    if (this.alive) {
        this.updateAngle(step);
        this.updatePosition(step);

        if (this.printing && (!this.trail.getLast() || this.getDistance(this.trail.getLast(), this.head) > this.precision)) {
            this.addPoint(this.head.slice(0));
        }
    }

    BaseAvatar.prototype.update.call(this);
};

/**
 * Set mask
 *
 * @param {Number} mask
 */
Avatar.prototype.setMask = function(mask)
{
    BaseAvatar.prototype.setMask.call(this, mask);

    this.body.setMask(this.mask);
};

/**
 * Set position
 *
 * @param {Array} point
 */
Avatar.prototype.setPosition = function(point)
{
    BaseAvatar.prototype.setPosition.call(this, point);

    this.body.position = this.head;

    this.emit('position', {avatar: this, point: this.head});
};

/**
 * Set angle
 *
 * @param {Array} point
 */
Avatar.prototype.setAngle = function(angle)
{
    BaseAvatar.prototype.setAngle.call(this, angle);
    this.emit('angle', {avatar: this, angle: this.angle});
};

/**
 * Set radius
 *
 * @param {Number} radius
 */
Avatar.prototype.setRadius = function(radius)
{
    BaseAvatar.prototype.setRadius.call(this, radius);
    this.body.radius = this.radius;
    this.emit('radius', {avatar: this, radius: this.radius});
};

/**
 * Add point
 *
 * @param {Array} point
 */
Avatar.prototype.addPoint = function(point, important)
{
    if (this.game.isPlaying()) {
        BaseAvatar.prototype.addPoint.call(this, point);
        important = important || this.angularVelocity;
        this.emit('point', {avatar: this, point: point, important: important});
    }
};

/**
 * Set printing
 *
 * @param {Boolean} printing
 */
Avatar.prototype.setPrinting = function(printing)
{
    if (!printing) {
        this.addPoint(this.head.slice(0), true);
    }

    BaseAvatar.prototype.setPrinting.call(this, printing);

    if (!this.printing) {
        this.trail.clear();
    }

    this.emit('printing', {avatar: this, printing: this.printing});

    if (printing) {
        this.addPoint(this.head.slice(0), true);
    }
};

/**
 * Die
 */
Avatar.prototype.die = function()
{
    BaseAvatar.prototype.die.call(this);
    this.addPoint(this.head.slice(0));
    this.emit('die', {avatar: this});
};

/**
 * Set score
 *
 * @param {Number} score
 */
Avatar.prototype.setScore = function(score)
{
    BaseAvatar.prototype.setScore.call(this, score);
    this.emit('score', {avatar: this, score: this.score});
};
