<?php
/**
 * This file is part of PHPWord - A pure PHP library for reading and writing
 * word processing documents.
 *
 * PHPWord is free software distributed under the terms of the GNU Lesser
 * General Public License version 3 as published by the Free Software Foundation.
 *
 * For the full copyright and license information, please read the LICENSE
 * file that was distributed with this source code. For the full list of
 * contributors, visit https://github.com/PHPOffice/PHPWord/contributors.
 *
 * @see         https://github.com/PHPOffice/PHPWord
 *
 * @license     http://www.gnu.org/licenses/lgpl.txt LGPL version 3
 */

declare(strict_types=1);

namespace PhpOffice\PhpWord\Element;

use PhpOffice\Math\Math;

/**
 * Formula element.
 */
class Formula extends AbstractElement
{
    /**
     * @var Math
     */
    protected $math;

    /**
     * Create a new Formula Element.
     */
    public function __construct(Math $math)
    {
        $this->setMath($math);
    }

    public function setMath(Math $math): self
    {
        $this->math = $math;

        return $this;
    }

    public function getMath(): Math
    {
        return $this->math;
    }
}
