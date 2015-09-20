import React from 'react';
import {Link} from 'react-router';

var DMCA = React.createClass({

	render: function() {
		return (	
		<div className='dmca-container view'>
			<Link to='/' className='flex-row'>
				<i className='fa fa-chevron-left center'/>
				<h3 className='center'>Back</h3>
			</Link>
			<h1>DMCA Notice</h1>
			Setmine makes all efforts to not willfully or knowingly infringe on copyright or intellectual property rights of others. Setmine also respects the intellectual property rights of others and the copyright laws of the United States Pursuant to the Digital Millennium Copyright Act (DMCA), as codified in 17 U.S.C 512, and as such Setmusic LLC has assigned a Designated Agent to receive notification of claimed copyright or intellectual property infringement.<br/>
			<br/>
			<h3>Notice and Takedown:</h3>
			If you wish to report a copyright infringement, we need you to send us a proper notification to contact@setmine.com. A proper notification MUST have at least the following information:
			<ol>
				<li>
					Identify yourself as either:
					<ol>
						<li>The owner of a copyrighted work(s), or</li>
						<li>A person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
					</ol>
				</li>
				<li>
					State your contact information, including your TRUE NAME, street address, telephone number, and email address.
				</li>
				<li>
					Identify the copyrighted work that you believe is being infringed.
				</li>
				<li>
					Identify the material that you claim is infringing your copyrighted work, to which you are requesting that SetMine disable access across all of its platforms.
				</li>
			</ol>
			<h2>Email: contact@setmine.com</h2>
		</div>
		);
	}

});

module.exports = DMCA;